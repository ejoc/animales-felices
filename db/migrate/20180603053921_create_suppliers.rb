class CreateSuppliers < ActiveRecord::Migration[5.2]
  def change
    create_table :suppliers do |t|
      t.string :cedula
      t.references :company, foreign_key: true
      t.string :company_role

    end

    add_index :suppliers, :cedula, unique: true
  end
end
