class Product < ApplicationRecord
  include Discard::Model
  default_scope -> { kept }
  
  acts_as :item

  belongs_to :unit_type
  belongs_to :product_category

  has_one :stock, class_name: 'StockProduct'

  # inventario de producto
  def self.report
    sql = <<-SQL
    SELECT
      i.name,
      coalesce((SELECT SUM(income_product_details.quantity) FROM income_product_details
      INNER JOIN items ON income_product_details.product_id = items.actable_id
      WHERE i.id = items.id), 0) as entradas,
      coalesce((SELECT SUM(invoice_details.quantity) FROM invoice_details WHERE item_id = i.id), 0) as salidas
    FROM items as i
    WHERE actable_type = 'Product'
    SQL

    connection.execute(sql)
  end
  # has_many :invoice_details, as: :item
end
