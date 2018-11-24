class CreateItems < ActiveRecord::Migration[5.2]
  def change
    # create_table :brands do |t|
    #   t.string :name
    #   t.timestamps
    # end

    create_table :items do |t|
      t.string :name
      # t.references :brand, foreign_key: true
      t.string :description
      t.float :price, precision: 5, scale: 2

      t.actable
      t.timestamps
    end
  end
end
