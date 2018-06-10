class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.references :client, foreign_key: true
      t.references :service, foreign_key: true
      t.references :doctor, foreign_key: true
      t.date       :date
      t.time       :start_time
      t.time       :end_time
      t.string     :status

      t.timestamps
    end
  end
end
