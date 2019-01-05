class SuppliersController < ApplicationController

  before_action :set_supplier, only: :show

  def index
    if search_params
      # @clients = Person.where('name ILIKE ?', "%#{search_params}%").where(actable_type: 'Client')
      @suppliers = Supplier.kept.joins(:person)
        .where('people.name ILIKE ? OR suppliers.cedula ILIKE ?', "%#{search_params}%", "#{search_params}%")
        .page(params[:page])
        .per(records_per_page)
    else
      @suppliers = Supplier.kept.page(params[:page]).per(records_per_page)
    end

    render json: @suppliers
  end

  def show
    render json: @supplier
  end

  private
    def set_supplier
      @supplier = Supplier.find_by(cedula: params[:id])
    end
end