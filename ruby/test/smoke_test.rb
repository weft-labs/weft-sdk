require 'minitest/autorun'
require 'weft/sdk'

class SmokeTest < Minitest::Test
  def test_generated_client_loads
    assert_equal Weft::SDK::VERSION, Weft::VERSION
    assert Weft::ApiClient
    assert_kind_of Hash, Weft::AccountDetails.allocate.to_hash
  end
end
