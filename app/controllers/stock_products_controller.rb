class StockProductsController < ApplicationController

  def index
    if search_params
      @products = Product.joins(:stock, :item)
        .select("products.id", "items.name", "stock_products.stock as stock")
        .where('items.name ILIKE ?', "%#{params[:search]}%")
        .page(params[:page])
        .per(records_per_page)
      # @products = StockProduct
      #   .joins(product: :item)
      #   .where('items.name LIKE ?', "%#{params[:search]}%")
      #   .page(params[:page])
      #   .per(records_per_page)
    else
      @products = Product.joins(:stock, :item)
        .select("products.id", "items.name", "stock_products.stock as stock_num")
        .page(params[:page]).per(records_per_page)
    end

    render json: ProductsSerializer.new(@products)

  end
  # def check_availability

  # end

end