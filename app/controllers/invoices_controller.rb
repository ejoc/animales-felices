class InvoicesController < ApplicationController
  before_action :set_invoice, only: [:show]
  # desabled on production
  skip_before_action :verify_authenticity_token
  layout 'basic'
  def index
    if search_params
      search_term = search_params.to_s.strip
      # .order('created_at DESC')
      @invoices = Invoice.joins(specialist: :person, client: :person)
        .select('people_clients.name AS client', 'people.name as specialist', 'invoices.*')
        .where(
          'invoices.no = ? OR people.name ILIKE ? OR people_clients.name ILIKE ?',
          search_term,
          "%#{search_term}%",
          "%#{search_term}%"
        ).page(params[:page]).per(records_per_page)
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

  def show
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "factura_no_#{@invoice.no}", disposition: 'attachment'
      end
    end
  end

  def create
    @invoice = Invoice.new(invoice_params)
    @invoice.specialist_id = Specialist.first.id
    
    if check_in
      render json: @invoice.id
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  private

    def invoice_params
      params.require(:invoice).permit(
        :no,
        :client_id,
        # :specialist_id,
        details_attributes: [:item_id, :quantity, :price_unit, :price_total],
      )
    end

    def set_invoice
      @invoice = Invoice.find(params[:id])
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