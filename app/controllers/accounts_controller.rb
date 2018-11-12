class AccountsController < ApplicationController

  before_action :authenticate_user!, :only => [:update_email, :update_password]  

  def update_password
    @user = current_user
    if @user.update_with_password(user_params)
      # Sign in the user by passing validation in case their password changed
      bypass_sign_in(@user)
      # redirect_to root_path
      # render json: { message: 'Has actualizado tu contraseña correctamente.' }, status: :ok
      render json: 'Has actualizado tu contraseña correctamente.', status: :ok
    else
      # render "edit"
      # render json: { message: 'Has actualizado tu contraseña correctamente.' }
      render json: camelize_response(@user.errors.as_json), status: :unprocessable_entity 
    end
  end

  def update_email
    @user = current_user
    if @user.update_without_password(email_param)
      # Sign in the user by passing validation in case their password changed
      bypass_sign_in(@user)
      render json: 'Has actualizado tu email correctamente.', status: :ok
    else
      render json: camelize_response(@user.errors.as_json), status: :unprocessable_entity 
    end
  end

  private
    def user_params
      params.require(:user).permit(:current_password, :password, :password_confirmation)
    end

    def email_param
      params.require(:user).permit(:email)
    end
end