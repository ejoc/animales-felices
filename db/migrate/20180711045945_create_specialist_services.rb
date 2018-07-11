class CreateSpecialistServices < ActiveRecord::Migration[5.2]
  def change
    create_table :specialist_services do |t|
      t.references :specialist, foreign_key: true
      t.references :service, foreign_key: true
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
