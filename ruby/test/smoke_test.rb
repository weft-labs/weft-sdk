require 'minitest/autorun'
require 'minitest/mock'
require 'logger'
require 'stringio'
require 'weft/sdk'

class SmokeTest < Minitest::Test
  def test_generated_client_loads
    assert_equal Weft::SDK::VERSION, Weft::VERSION
    assert Weft::ApiClient
    assert_kind_of Hash, Weft::AccountDetails.allocate.to_hash
  end

  def test_generated_debug_logging_omits_request_and_response_secrets
    output = StringIO.new
    configuration = Weft::Configuration.new
    configuration.debugging = true
    configuration.logger = Logger.new(output)
    client = Weft::ApiClient.new(configuration)

    request = client.build_request(
      :post,
      '/api/v1/auth/sign_in',
      :header_params => { 'Authorization' => 'Bearer request-secret' },
      :body => { :password => 'password-secret' }
    )
    assert_equal false, request.options[:verbose]

    response = Struct.new(:body, :code, :headers) do
      def success? = true
    end.new('{"temporary_api_key":"response-secret"}', 200, {})
    fake_request = Struct.new(:response) do
      def run = response
    end.new(response)
    client.stub(:build_request, fake_request) do
      client.call_api(:post, '/api/v1/auth/sign_in')
    end

    operation_secret = Struct.new(:temporary_api_key).new('operation-secret')
    client.stub(:call_api, [operation_secret, 200, { 'X-Secret' => 'header-secret' }]) do
      Weft::AgentBootstrapApi.new(client).create_account_bootstrap_with_http_info(
        Weft::AccountBootstrapRequest.new(
          :email => 'agent@example.com',
          :agent_name => 'Agent',
          :host_name => 'CLI',
          :reason => 'Test'
        )
      )
    end

    refute_includes output.string, 'request-secret'
    refute_includes output.string, 'password-secret'
    refute_includes output.string, 'response-secret'
    refute_includes output.string, 'operation-secret'
    refute_includes output.string, 'header-secret'
    assert_includes output.string, 'POST /api/v1/auth/sign_in -> 200'
  end

  def test_me_discriminator_accepts_json_string_keys
    principal = Weft::MeResponseData.build(
      'principal_type' => 'user',
      'id' => 1,
      'email' => 'agent@example.com',
      'status' => 'active',
      'buyer_enabled' => true,
      'seller_enabled' => false,
      'provisioning_status' => 'pending',
      'wallet' => nil
    )

    assert_instance_of Weft::UserPrincipal, principal
    assert_nil principal.wallet
  end
end
