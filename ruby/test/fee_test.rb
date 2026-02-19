require 'minitest/autorun'
require_relative '../lib/weft/facilitator/client'
require_relative '../lib/weft/facilitator/fee'

class FeeTest < Minitest::Test
  def setup
    Weft::Facilitator::Fee.invalidate_fee_cache
  end

  def teardown
    Weft::Facilitator::Fee.invalidate_fee_cache
  end

  def test_validates_fee_structure
    mock_client = Minitest::Mock.new
    mock_client.expect(:supported, {
                         'fee' => { 'amount' => '0.001', 'asset' => 'USDC', 'network' => 'base-sepolia' }
                       })

    fee = Weft::Facilitator::Fee.get_fee_info(client: mock_client)

    assert_equal '0.001', fee['amount']
    assert_equal 'USDC', fee['asset']
    assert_equal 'base-sepolia', fee['network']
    mock_client.verify
  end

  def test_caches_fee_info
    call_count = 0
    mock_client = Object.new
    mock_client.define_singleton_method(:supported) do
      call_count += 1
      { 'fee' => { 'amount' => '0.001', 'asset' => 'USDC', 'network' => 'base-sepolia' } }
    end

    first = Weft::Facilitator::Fee.get_fee_info(client: mock_client)
    second = Weft::Facilitator::Fee.get_fee_info(client: mock_client)

    assert_equal first, second
    assert_equal 1, call_count
  end

  def test_refetches_after_invalidation
    call_count = 0
    mock_client = Object.new
    mock_client.define_singleton_method(:supported) do
      call_count += 1
      { 'fee' => { 'amount' => '0.001', 'asset' => 'USDC', 'network' => 'base-sepolia' } }
    end

    Weft::Facilitator::Fee.get_fee_info(client: mock_client)
    Weft::Facilitator::Fee.invalidate_fee_cache
    Weft::Facilitator::Fee.get_fee_info(client: mock_client)

    assert_equal 2, call_count
  end

  def test_raises_when_fee_not_found
    mock_client = Object.new
    mock_client.define_singleton_method(:supported) { {} }

    assert_raises(RuntimeError) do
      Weft::Facilitator::Fee.get_fee_info(client: mock_client)
    end
  end

  def test_raises_when_amount_not_string
    mock_client = Object.new
    mock_client.define_singleton_method(:supported) do
      { 'fee' => { 'amount' => 0.001, 'asset' => 'USDC', 'network' => 'base-sepolia' } }
    end

    assert_raises(RuntimeError) do
      Weft::Facilitator::Fee.get_fee_info(client: mock_client)
    end
  end

  def test_raises_when_asset_not_string
    mock_client = Object.new
    mock_client.define_singleton_method(:supported) do
      { 'fee' => { 'amount' => '0.001', 'asset' => 123, 'network' => 'base-sepolia' } }
    end

    assert_raises(RuntimeError) do
      Weft::Facilitator::Fee.get_fee_info(client: mock_client)
    end
  end
end
