require 'minitest/autorun'
require 'weft/sdk'

class SmokeTest < Minitest::Test
  def test_generated_client_loads
    assert_equal Weft::SDK::VERSION, Weft::VERSION
    assert Weft::ApiClient
    assert_kind_of Hash, Weft::AccountDetails.allocate.to_hash
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
