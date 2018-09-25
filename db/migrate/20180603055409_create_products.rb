class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :product_categories do |t|
      t.string :name

      t.timestamps
    end

    create_table :unit_types do |t|
      t.string :name
      t.timestamps
    end

    create_table :products do |t|
      # t.string :name
      # t.string :description
      # t.decimal :price, precision: 5, scale: 2
      # t.timestamps
      t.references :unit_type, foreign_key: true

      t.references :product_category, foreign_key: true
    end
  end
end
