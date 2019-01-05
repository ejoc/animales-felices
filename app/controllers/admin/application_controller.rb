# All Administrate controllers inherit from this `Admin::ApplicationController`,
# making it the ideal place to put authentication logic or other
# before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    before_action :authenticate_user!, :authenticate_admin

    def not_found
      raise ActionController::RoutingError.new('Not Found')
    end

    def authenticate_admin
      # TODO Add authentication logic here.
      (current_user && access_whitelist) || not_found
    end

    def destroy
      if requested_resource.respond_to?(:discard)
        if requested_resource.discard
          flash[:notice] = translate_with_resource("destroy.success")
        else
          flash[:error] = requested_resource.errors.full_messages.join("<br/>")
        end
        redirect_to action: :index
      else
        super
      end
    end

    def scoped_resource
      resource_class.default_scoped.respond_to?(:kept) ? resource_class.default_scoped.kept : super
    end

    # Override this value to specify the number of elements to display at a time
    # on index pages. Defaults to 20.
    # def records_per_page
    #   params[:per_page] || 20
    # end

    private

    def access_whitelist
      current_user.admin?
    end
  end
end
