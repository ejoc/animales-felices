module Admin
  class UsersController < Admin::ApplicationController
    def update
      if params[:user][:password].blank?
        params[:user].delete(:password)
        params[:user].delete(:password_confirmation)
      end
      # if params[:user][:active] == "1"
      #   params[:user][:discarded_at] = nil
      #   # params[:user].delete(:discarded_at)
      # else
      #   # requested_resource
      #   params[:user][:discarded_at] = Time.now
      # end
      # params[:user].delete(:active)
      super
    end

    # def destroy
    # end

    # def valid_action?(name, resource = resource_class)
    #   %w[destroy].exclude?(name.to_s) && super
    #   # false
    # end

    def active
      requested_resource.undiscard
      flash[:notice] = translate_with_resource("active.success")
      redirect_to action: :index
    end

    def inactive
      requested_resource.discard
      # redirect_to(
      #   [namespace, requested_resource],
      #   notice: translate_with_resource("update.success"),
      # )
      flash[:notice] = translate_with_resource("inactive.success")
      redirect_to action: :index
    end

    def scoped_resource
      resource_class
        .where.not(email: current_user.email, admin: true)
    end
  end
end
