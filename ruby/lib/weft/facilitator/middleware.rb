module Weft
  module Facilitator
    class RackMiddleware
      def initialize(app, config: {})
        @app = app
        @config = config
      end

      def call(env)
        # Placeholder for x402 Rack middleware integration.
        @app.call(env)
      end
    end
  end
end
