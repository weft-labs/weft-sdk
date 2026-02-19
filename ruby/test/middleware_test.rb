require 'minitest/autorun'
require 'json'
require_relative '../lib/weft/facilitator/middleware'

class MiddlewareTest < Minitest::Test
  def test_passthrough_when_no_routes
    inner_app = ->(_env) { [200, { 'Content-Type' => 'text/plain' }, ['OK']] }
    middleware = Weft::Facilitator::RackMiddleware.new(inner_app)

    env = rack_env('/hello')
    status, _, body = middleware.call(env)

    assert_equal 200, status
    assert_equal ['OK'], body
  end

  def test_passthrough_when_route_not_matched
    inner_app = ->(_env) { [200, {}, ['OK']] }
    middleware = Weft::Facilitator::RackMiddleware.new(
      inner_app,
      routes: [{ path: '/paid', price: '0.01', asset: 'USDC', pay_to: '0xabc' }]
    )

    env = rack_env('/free')
    status, _, body = middleware.call(env)

    assert_equal 200, status
    assert_equal ['OK'], body
  end

  def test_returns_402_when_no_payment_header
    inner_app = ->(_env) { [200, {}, ['OK']] }
    middleware = Weft::Facilitator::RackMiddleware.new(
      inner_app,
      routes: [{ path: '/paid', price: '0.01', asset: 'USDC', pay_to: '0xabc', network: 'base-sepolia' }]
    )

    env = rack_env('/paid')
    status, headers, body = middleware.call(env)

    assert_equal 402, status
    assert_equal 'application/json', headers['Content-Type']
    assert_equal 'true', headers['X-Payment-Required']

    parsed = JSON.parse(body.first)
    assert_equal 2, parsed['x402Version']
    assert_equal 'Payment Required', parsed['error']
    assert_equal 1, parsed['accepts'].length

    accept = parsed['accepts'].first
    assert_equal '0.01', accept['amount']
    assert_equal 'USDC', accept['asset']
    assert_equal '0xabc', accept['payTo']
    assert_equal 'base-sepolia', accept['network']
  end

  def test_wildcard_route_matches_all
    inner_app = ->(_env) { [200, {}, ['OK']] }
    middleware = Weft::Facilitator::RackMiddleware.new(
      inner_app,
      routes: [{ path: '*', price: '0.01', asset: 'USDC', pay_to: '0xabc' }]
    )

    env = rack_env('/anything')
    status, = middleware.call(env)

    assert_equal 402, status
  end

  def test_regexp_route_matching
    inner_app = ->(_env) { [200, {}, ['OK']] }
    middleware = Weft::Facilitator::RackMiddleware.new(
      inner_app,
      routes: [{ path: %r{^/api/}, price: '0.01', asset: 'USDC', pay_to: '0xabc' }]
    )

    # Matches
    env = rack_env('/api/resource')
    status, = middleware.call(env)
    assert_equal 402, status

    # Does not match
    env = rack_env('/public/page')
    status, _, body = middleware.call(env)
    assert_equal 200, status
    assert_equal ['OK'], body
  end

  def test_middleware_accepts_config
    inner_app = ->(_env) { [200, {}, ['OK']] }
    middleware = Weft::Facilitator::RackMiddleware.new(
      inner_app,
      config: { facilitator_url: 'https://x402.weft.network' }
    )

    assert_instance_of Weft::Facilitator::RackMiddleware, middleware
  end

  def test_default_values_in_route_config
    config = Weft::Facilitator::RouteConfig.new(
      path: '/paid',
      price: '0.01',
      asset: 'USDC',
      pay_to: '0xabc'
    )

    assert_equal 'base-sepolia', config.network
    assert_equal 60, config.max_deadline_seconds
  end

  private

  def rack_env(path, method: 'GET', headers: {})
    env = {
      'REQUEST_METHOD' => method,
      'PATH_INFO' => path,
      'HTTP_HOST' => 'localhost',
      'rack.url_scheme' => 'https'
    }
    headers.each do |key, value|
      rack_key = "HTTP_#{key.upcase.tr('-', '_')}"
      env[rack_key] = value
    end
    env
  end
end
