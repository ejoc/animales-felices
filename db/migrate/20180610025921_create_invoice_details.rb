class CreateInvoiceDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :invoice_details do |t|
      t.references :invoice, foreign_key: true
      # t.references :item, polymorphic: true, index: true
      t.references :item, foreign_key: true
      t.decimal :quantity
      t.decimal :price_unit, precision: 5, scale: 2
      t.decimal :price_total, precision: 5, scale: 2

    end
  end
end
