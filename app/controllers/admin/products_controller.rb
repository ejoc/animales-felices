module Admin
  class ProductsController < Admin::ApplicationController

    def index
      search_term = params[:search].to_s.strip
      resources = Product.joins(:item).where('items.name ILIKE ?', "%#{search_term}%")
      resources = resources.page(params[:page]).per(records_per_page)
      page = Administrate::Page::Collection.new(dashboard, order: order)

      render locals: {
        resources: resources,
        search_term: search_term,
        page: page,
        show_search_bar: show_search_bar?,
      }
    end

    def export
      # send_data scoped_resource.report, filename: "#{resource_name}.csv"
      # respond_to do |format|
      #   format.xlsx
      # end
      @inventario = Product.report
      @inventario = @inventario
        .map{|row| row["stock"] = row["entradas"] - row["salidas"]; row }
        .sort_by{|row| -row["stock"] }
      render xlsx: "export", template: "admin/products/export.xlsx"
    end
  end
end
