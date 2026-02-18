require 'net/http'
require 'json'

module Weft
  module Facilitator
    DEFAULT_URL = 'https://x402.weft.network'.freeze
    DEFAULT_ENV = 'X402_FACILITATOR_URL'.freeze

    class Client
      def initialize(url: nil, create_headers: nil)
        @url = resolve_url(url)
        validate_url(@url)
        @create_headers = create_headers
      end

      def verify(payment_payload:, payment_requirements:)
        post_json('/verify', {
                    x402Version: 2,
                    paymentPayload: payment_payload,
                    paymentRequirements: payment_requirements
                  })
      end

      def settle(payment_payload:, payment_requirements:)
        post_json('/settle', {
                    x402Version: 2,
                    paymentPayload: payment_payload,
                    paymentRequirements: payment_requirements
                  })
      end

      def supported
        get_json('/supported')
      end

      private

      def resolve_url(url)
        return url if url && !url.empty?

        env = ENV.fetch(DEFAULT_ENV, nil)
        return env if env && !env.empty?

        DEFAULT_URL
      end

      def validate_url(url)
        return unless url.empty? || (!url.start_with?('http://') && !url.start_with?('https://'))

        raise ArgumentError, "Invalid URL: #{url}"
      end

      def build_headers(scope)
        headers = { 'Content-Type' => 'application/json' }
        return headers unless @create_headers

        custom = @create_headers.call
        scope_headers = custom && custom[scope]
        headers.merge(scope_headers || {})
      end

      def get_json(path)
        uri = URI.join(@url, path)
        request = Net::HTTP::Get.new(uri, build_headers('supported'))
        response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
          http.request(request)
        end
        parse_response(response)
      end

      def post_json(path, body)
        uri = URI.join(@url, path)
        scope = path.include?('verify') ? 'verify' : 'settle'
        request = Net::HTTP::Post.new(uri, build_headers(scope))
        request.body = JSON.generate(body)
        response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
          http.request(request)
        end
        parse_response(response)
      end

      def parse_response(response)
        raise "Facilitator request failed: #{response.code} #{response.body}" unless response.is_a?(Net::HTTPSuccess)

        JSON.parse(response.body)
      end
    end
  end
end
