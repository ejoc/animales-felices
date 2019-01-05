class ProductsController < ApplicationController
  def index
    if search_params
      @products = Product.kept.left_joins(:stock, :item)
        .where('items.name ILIKE ?', "%#{params[:search]}%")
        .page(params[:page])
        .per(records_per_page)
    else
      @products = Product.kept.left_joins(:stock, :item).page(params[:page]).per(records_per_page)
    end

    render json: ProductsSerializer.new(@products)
  end
end