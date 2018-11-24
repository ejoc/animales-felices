# All Administrate controllers inherit from this `Admin::ApplicationController`,
# making it the ideal place to put authentication logic or other
# before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    before_action :authenticate_user!
    # before_action :authenticate_admin

    def not_found
      raise ActionController::RoutingError.new('Not Found')
    end

    def authenticate_admin
      # TODO Add authentication logic here.
      (current_user && access_whitelist) || not_found
    end

    # Override this value to specify the number of elements to display at a time
    # on index pages. Defaults to 20.
    # def records_per_page
    #   params[:per_page] || 20
    # end

    private
      def access_whitelist
        # current_user.has_role?(:admin) || current_user.has_role?(:super_admin)
        current_user.admin?
      end
  end
end
