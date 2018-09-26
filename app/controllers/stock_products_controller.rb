class StockProductsController < ApplicationController

  def index
    if search_params
      @products = StockProduct
        .joins(product: :item)
        .where('items.name LIKE ?', "%#{params[:search]}%")
        .page(params[:page])
        .per(records_per_page)
    else
      @products = StockProduct.page(params[:page]).per(records_per_page)
    end

    render json: @products

  end
  # def check_availability

  # end

end