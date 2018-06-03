class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :product_categories do |t|
      t.string :name

      t.timestamps
    end

    create_table :products do |t|
      t.string :name
      t.string :unit_type
      t.string :description
      t.decimal :price, precision: 5, scale: 2

      t.references :product_category, foreign_key: true
      t.timestamps
    end
  end
end
