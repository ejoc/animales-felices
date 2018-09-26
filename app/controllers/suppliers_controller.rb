class SuppliersController < ApplicationController
  def index
    if search_params
      # @clients = Person.where('name ILIKE ?', "%#{search_params}%").where(actable_type: 'Client')
      @suppliers = Supplier.joins(:person)
        .where('people.name ILIKE ?', "%#{search_params}%")
        .page(params[:page])
        .per(records_per_page)
    else
      @suppliers = Supplier.page(params[:page]).per(records_per_page)
    end

    render json: @suppliers
  end
end