class ServicesController < ApplicationController
  def index
    if search_params
      @services = Service.kept.joins(:item)
        .where('items.name ILIKE ?', "%#{params[:search]}%")
        .page(params[:page])
        .per(records_per_page)
    else
      # @services = Service.left_joins(:item).page(params[:page]).per(records_per_page)
      @services = Service.kept.joins(:item).page(params[:page]).per(records_per_page)
    end

    render json: ServiceSerializer.new(@services)
  end
end