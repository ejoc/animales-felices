class IncomeProductsController < ApplicationController
  
  # desabled on production
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @income_product = IncomeProduct.new(income_product_params)
    @income_product.specialist_id = Specialist.first.id
    if check_in
      render json: 'ok'
    else
      render json: @income_product.errors, status: :unprocessable_entity
    end
  end
  
  private

    def income_product_params
      params.require(:income_product).permit(
        :supplier_id,
        details_attributes: [:product_id, :quantity, :price_unit, :price_total],
      )
    end

    def check_in
      ActiveRecord::Base.transaction do
        @income_product.save!
        @income_product.details.each do |detail|
          product_stock = StockProduct.find_or_initialize_by(product_id: detail.product_id)
          product_stock.stock = product_stock.stock + detail.quantity
          product_stock.save!
        end
      end
      return true
    rescue
      return false
    end
end