module Admin
  class ProductsController < Admin::ApplicationController

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
