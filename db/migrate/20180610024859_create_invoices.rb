class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.references :client, foreign_key: true
      t.references :doctor, foreign_key: true
      t.decimal :sub_total, precision: 5, scale: 2
      t.decimal :total, precision: 5, scale: 2
      t.decimal :iva, precision: 5, scale: 2

      t.timestamps
    end
  end
end
