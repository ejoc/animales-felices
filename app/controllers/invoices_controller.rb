class InvoicesController < ApplicationController

  # desabled on production
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @invoice = Invoice.new(invoice_params)
    @invoice.specialist_id = Specialist.first.id
    
    if check_in
      render json: 'ok'
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  private

    def invoice_params
      params.require(:invoice).permit(
        :client_id,
        # :specialist_id,
        details_attributes: [:item_id, :quantity, :price_unit, :price_total],
      )
    end


    def check_in
      ActiveRecord::Base.transaction do
        @invoice.save!
        @invoice.details
          .joins(:item)
          .where('items.actable_type' => 'Product')
          .each do |detail|
            product = detail.item.specific
            product_stock = StockProduct.find_or_initialize_by(product_id: product.id)
            product_stock.stock = product_stock.stock - detail.quantity
            product_stock.save!
          end
      end
      return true
    rescue
      return false
    end
end