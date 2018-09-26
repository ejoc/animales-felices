class ProductsController < ApplicationController
  def index
    if search_params
      @products = Product.joins(:item)
        .where('items.name LIKE ?', "%#{params[:search]}%")
        .page(params[:page])
        .per(records_per_page)
    else
      @products = Product.page(params[:page]).per(records_per_page)
    end

    render json: @products
  end
end