class ClientsController < ApplicationController
  def index
    if search_params
      # @clients = Person.where('name ILIKE ?', "%#{search_params}%").where(actable_type: 'Client')
      @clients = Client.joins(:person)
        .where('people.name ILIKE ?', "%#{search_params}%")
        .page(params[:page])
        .per(records_per_page)
    else
      @clients = Client.page(params[:page]).per(records_per_page)
    end

    render json: @clients
  end
end