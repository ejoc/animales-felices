class ClientsController < ApplicationController
  def index
    if search_params
      @clients = Person.where('name ILIKE ?', "%#{search_params}%").where(actable_type: 'Client')
    else
      @clients = Client.all
    end

    render json: @clients
  end

  private
    def search_params
      params[:search] || false
    end
end