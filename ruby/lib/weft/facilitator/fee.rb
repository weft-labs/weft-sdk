module Weft
  module Facilitator
    module Fee
      DEFAULT_TTL = 300

      @cache = nil

      class << self
        def get_fee_info(client: Client.new, ttl: DEFAULT_TTL)
          return @cache[:fee] if cache_valid?

          supported = client.supported
          fee = supported['fee']
          raise 'Fee information not found in /supported response' unless fee

          validate_fee!(fee)

          @cache = {
            fee: fee,
            fetched_at: Time.now.to_i,
            ttl: ttl
          }

          fee
        end

        def invalidate_fee_cache
          @cache = nil
        end

        private

        def cache_valid?
          return false unless @cache

          Time.now.to_i - @cache[:fetched_at] < @cache[:ttl]
        end

        def validate_fee!(fee)
          raise 'Invalid fee structure: amount must be a string' unless fee['amount'].is_a?(String)
          raise 'Invalid fee structure: asset must be a string' unless fee['asset'].is_a?(String)
          raise 'Invalid fee structure: network must be a string' unless fee['network'].is_a?(String)
        end
      end
    end
  end
end
