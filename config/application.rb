require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module AnimalesFelices
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version. 
    config.load_defaults 5.2

    config.iva = 0.12

    config.i18n.default_locale = :es

    config.time_zone = 'Eastern Time (US & Canada)'
    config.active_record.default_timezone = :utc

    config.action_controller.action_on_unpermitted_parameters = :raise

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.to_prepare do
      Administrate::ApplicationController.helper AnimalesFelices::Application.helpers

      Devise::SessionsController.layout "devise"
      # Devise::RegistrationsController.layout proc{ |controller| user_signed_in? ? "application" : "devise" }
      Devise::RegistrationsController.layout "devise"
      Devise::ConfirmationsController.layout "devise"
      Devise::UnlocksController.layout "devise"            
      Devise::PasswordsController.layout "devise"
    end

    config.action_mailer.delivery_method = :mailgun
    config.action_mailer.mailgun_settings = {
      api_key: Rails.application.credentials.mailgun_api_key,
      domain: Rails.application.credentials.mailgun_domain
    }
  end
end
