class CreateServices < ActiveRecord::Migration[5.2]
  def change
    create_table :services do |t|
      t.string :name
      t.int :duration_min
      t.decimal :price, precision: 5, scale: 2

      t.timestamps
    end
  end
end
