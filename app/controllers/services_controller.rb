class ServicesController < ApplicationController
  def index
    if search_params
      @services = Service.left_joins(:item)
        .where('items.name ILIKE ?', "%#{params[:search]}%")
        .page(params[:page])
        .per(records_per_page)
    else
      @services = Service.left_joins(:item).page(params[:page]).per(records_per_page)
    end

    render json: @services
  end
end