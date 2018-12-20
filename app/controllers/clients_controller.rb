class ClientsController < ApplicationController
  before_action :set_client, only: :show

  def index
    if search_params
      # @clients = Person.where('name ILIKE ?', "%#{search_params}%").where(actable_type: 'Client')
      @clients = Client.joins(:person)
        .where('people.name ILIKE ? OR clients.cedula ILIKE ?', "%#{search_params}%", "#{search_params}%")
        .page(params[:page])
        .per(records_per_page)
    else
      @clients = Client.page(params[:page]).per(records_per_page)
    end

    render json: @clients
  end

  def show
    render json: @client
  end

  def create
    @client = Client.new(client_params)
    if @client.save
      render json: @client, status: :created
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  private

  def set_client
    @client = Client.find_by(cedula: params[:id])
  end

  def client_params
    # params.fetch(:client, {})
    params.require(:client).permit(:cedula, :name, :email, :address, :phone)
  end
end
