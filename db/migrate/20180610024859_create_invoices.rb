class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.references :client, foreign_key: true
      t.references :specialist, foreign_key: true
      t.decimal :sub_total, precision: 5, scale: 2
      t.decimal :total, precision: 5, scale: 2
      t.decimal :iva, precision: 5, scale: 2

      # t.actable
      t.timestamps
    end

    create_table :income_products do |t|
      t.references :specialist, foreign_key: true
      t.references :supplier, foreign_key: true
      # t.string     :number

      t.decimal :sub_total, precision: 5, scale: 2
      t.decimal :total, precision: 5, scale: 2
      t.decimal :iva, precision: 5, scale: 2

      t.timestamps
    end

    create_table :income_product_details do |t|
      t.references :income_product, foreign_key: true
      # t.references :item, polymorphic: true, index: true
      t.references :product, foreign_key: true
      t.decimal :quantity
      t.decimal :price_unit, precision: 5, scale: 2
      t.decimal :price_total, precision: 5, scale: 2

    end

  end
end
