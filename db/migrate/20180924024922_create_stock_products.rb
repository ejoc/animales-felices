class CreateStockProducts < ActiveRecord::Migration[5.2]
  def change
    # create_table :locations do |t|
    #   t.string :name

    #   t.timestamps
    # end

    create_table :stock_products do |t|
      t.references :product, foreign_key: true
      t.float      :stock, default: 0

      t.timestamps
    end
  end
end
