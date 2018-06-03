class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.references :client, foreign_key: true
      t.references :service, foreign_key: true
      t.references :doctor, foreign_key: true
      t.datetime :date_start
      t.datetime :date_end
      t.string :status

      t.timestamps
    end
  end
end
