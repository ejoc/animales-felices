class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.float :price, precision: 5, scale: 2

      t.actable
      t.timestamps
    end
  end
end
