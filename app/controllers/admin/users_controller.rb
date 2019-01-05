module Admin
  class UsersController < Admin::ApplicationController
    def update
      if params[:user][:password].blank?
        params[:user].delete(:password)
        params[:user].delete(:password_confirmation)
      end
      super
    end

    # def destroy
    # end

    # def valid_action?(name, resource = resource_class)
    #   %w[destroy].exclude?(name.to_s) && super
    #   # false
    # end
  end
end
