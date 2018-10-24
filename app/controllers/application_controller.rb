class ApplicationController < ActionController::Base

  private
    def records_per_page
      params[:per_page] || 20
    end

    def search_params
      params[:search] || false
    end

    # def set_default_props
    #   props = {
    #     user_signed_in: user_signed_in?,
    #     current_user: current_user && current_user.email,
    #     flash_messages: flash_messages,
    #   }
    #   if(user_signed_in?)
    #     props[:roles] = [
    #       current_user.has_role?(:admin) ? 'admin' : nil, 
    #       current_user.has_role?(:sales) ? 'sales' : nil
    #     ].compact
    #   end
    #   return props
    # end
end
