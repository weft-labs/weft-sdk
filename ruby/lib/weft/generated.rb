require_relative 'generated/version'
require_relative 'generated/api_error'
require_relative 'generated/api_model_base'
require_relative 'generated/configuration'
require_relative 'generated/api_client'

Dir[File.join(__dir__, 'generated/models/*.rb')].sort.each { |file| require file }
Dir[File.join(__dir__, 'generated/api/*.rb')].sort.each { |file| require file }
