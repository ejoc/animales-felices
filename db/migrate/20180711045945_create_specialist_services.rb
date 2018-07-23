class CreateSpecialistServices < ActiveRecord::Migration[5.2]
  def change
    create_table :specialist_services do |t|
      t.references :specialist, foreign_key: true
      t.references :service, foreign_key: true
      t.boolean :active, default: true

      t.timestamps
    end

    add_index :specialist_services, [:specialist_id, :service_id], unique: true
  end
end
