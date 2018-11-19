class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :payment_methods do |t|
      t.string :name
      t.timestamps
    end

    create_table :invoices do |t|
      t.string :no
      t.references :client, foreign_key: true
      t.references :specialist, foreign_key: true
      t.references :payment_method, foreign_key: true
      t.float :sub_total, precision: 5, scale: 2
      t.float :total, precision: 5, scale: 2
      t.float :iva, precision: 5, scale: 2
      t.boolean :canceled, default: false
      # t.string :forma_pago
      # t.actable
      t.timestamps
    end

    add_index :invoices, :no, unique: true

    create_table :invoice_details do |t|
      t.references :invoice, foreign_key: true
      # t.references :item, polymorphic: true, index: true
      t.references :item, foreign_key: true
      t.float :quantity
      t.float :price_unit, precision: 5, scale: 2
      t.float :price_total, precision: 5, scale: 2

    end

    create_table :income_products do |t|
      t.references :specialist, foreign_key: true
      t.references :supplier, foreign_key: true
      # t.string     :number

      t.float :sub_total, precision: 5, scale: 2
      t.float :total, precision: 5, scale: 2
      t.float :iva, precision: 5, scale: 2

      t.timestamps
    end

    create_table :income_product_details do |t|
      t.references :income_product, foreign_key: true
      # t.references :item, polymorphic: true, index: true
      t.references :product, foreign_key: true
      t.float :quantity
      t.float :price_unit, precision: 5, scale: 2
      t.float :price_total, precision: 5, scale: 2

    end

  end
end
