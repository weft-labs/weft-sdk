require 'json'
require_relative 'client'

module Weft
  module Facilitator
    # Configuration for a route that requires payment.
    #
    #   {
    #     path: "/api/resource",          # string or Regexp
    #     price: "0.01",                  # price in asset units
    #     asset: "USDC",
    #     network: "base-sepolia",
    #     pay_to: "0x...",                # recipient address
    #     description: "Access resource",
    #     max_deadline_seconds: 60,
    #   }
    RouteConfig = Struct.new(
      :path, :price, :asset, :network, :pay_to,
      :description, :max_deadline_seconds,
      keyword_init: true
    ) do
      def initialize(**kwargs)
        super
        self.network ||= 'base-sepolia'
        self.max_deadline_seconds ||= 60
        self.description ||= ''
      end
    end

    class RackMiddleware
      PAYMENT_HEADERS = %w[HTTP_X_PAYMENT HTTP_PAYMENT_SIGNATURE].freeze
      X402_VERSION = 2

      # @param app [#call] The downstream Rack app
      # @param routes [Array<Hash>] Route payment configurations
      # @param config [Hash] Options including :facilitator_url
      def initialize(app, routes: [], config: {})
        @app = app
        @config = config
        @routes = routes.map do |r|
          r.is_a?(RouteConfig) ? r : RouteConfig.new(**r)
        end
        @client = Client.new(url: config[:facilitator_url])
      end

      def call(env)
        return @app.call(env) if @routes.empty?

        request_path = env['PATH_INFO'] || '/'
        route = match_route(request_path)

        return @app.call(env) unless route

        payment_header = extract_payment_header(env)

        return payment_required_response(route, env) unless payment_header

        # Verify the payment via facilitator
        payment_payload = parse_payment(payment_header)
        requirements = build_requirements(route, env)

        begin
          verify_result = @client.verify(
            payment_payload: payment_payload,
            payment_requirements: requirements
          )
        rescue StandardError => e
          return error_response(402, "Payment verification failed: #{e.message}")
        end

        unless verify_result['valid']
          return error_response(402, verify_result['message'] || 'Payment verification failed')
        end

        # Call the downstream app
        status, headers, body = @app.call(env)

        # If the app returned an error, don't settle
        return [status, headers, body] if status >= 400

        # Settle the payment
        begin
          settle_result = @client.settle(
            payment_payload: payment_payload,
            payment_requirements: requirements
          )

          return error_response(402, "Settlement failed: #{settle_result['message']}") unless settle_result['success']

          headers['X-Payment-TxHash'] = settle_result['txHash'] if settle_result['txHash']
        rescue StandardError => e
          return error_response(402, "Settlement failed: #{e.message}")
        end

        [status, headers, body]
      end

      private

      def match_route(path)
        @routes.find do |route|
          case route.path
          when Regexp
            route.path.match?(path)
          when '*'
            true
          else
            route.path == path
          end
        end
      end

      def extract_payment_header(env)
        PAYMENT_HEADERS.each do |header|
          value = env[header]
          return value if value && !value.empty?
        end
        nil
      end

      def parse_payment(header_value)
        JSON.parse(header_value)
      rescue JSON::ParserError
        # If not JSON, treat as an opaque token
        { 'token' => header_value }
      end

      def build_requirements(route, env)
        {
          'scheme' => 'exact',
          'network' => route.network,
          'asset' => route.asset,
          'amount' => route.price,
          'payTo' => route.pay_to,
          'maxTimeoutSeconds' => route.max_deadline_seconds,
          'resource' => {
            'url' => request_url(env),
            'method' => env['REQUEST_METHOD'],
            'description' => route.description
          }
        }
      end

      def request_url(env)
        scheme = env['rack.url_scheme'] || 'https'
        host = env['HTTP_HOST'] || env['SERVER_NAME'] || 'localhost'
        path = env['PATH_INFO'] || '/'
        "#{scheme}://#{host}#{path}"
      end

      def payment_required_response(route, env)
        body = {
          'x402Version' => X402_VERSION,
          'error' => 'Payment Required',
          'accepts' => [{
            'scheme' => 'exact',
            'network' => route.network,
            'asset' => route.asset,
            'amount' => route.price,
            'payTo' => route.pay_to,
            'maxTimeoutSeconds' => route.max_deadline_seconds,
            'resource' => {
              'url' => request_url(env),
              'method' => env['REQUEST_METHOD'],
              'description' => route.description
            }
          }]
        }

        [
          402,
          {
            'Content-Type' => 'application/json',
            'X-Payment-Required' => 'true'
          },
          [JSON.generate(body)]
        ]
      end

      def error_response(status, message)
        body = { 'error' => message }
        [
          status,
          { 'Content-Type' => 'application/json' },
          [JSON.generate(body)]
        ]
      end
    end
  end
end
