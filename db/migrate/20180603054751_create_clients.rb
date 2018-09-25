class CreateClients < ActiveRecord::Migration[5.2]
  def change
    create_table :clients do |t|
      t.string :cedula
    end
    add_index :clients, :cedula, unique: true
  end
end
