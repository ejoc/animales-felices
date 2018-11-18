class InvoicesController < ApplicationController

  # desabled on production
  skip_before_action :verify_authenticity_token

  def index
    if search_params
      search_term = search_params.to_s.strip
      @invoices = Invoice.joins(specialist: :person, client: :person)
        .select('people_clients.name AS client', 'people.name as specialist', 'invoices.*')
        .where('people.name ILIKE ? OR people_clients.name ILIKE ?', "%#{search_term}%", "%#{search_term}%")
        .page(params[:page]).per(records_per_page)
    else
      @invoices = Invoice.joins(specialist: :person, client: :person)
        .select('people_clients.name AS client', 'people.name as specialist', 'invoices.*')
        .page(params[:page]).per(records_per_page)
    end
    render json: {
      meta: {
        totalCount: @invoices.total_count,
        perPage: records_per_page,
        currentPage: @invoices.current_page,
      },
      invoices: @invoices
    }
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