class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.references :service, foreign_key: true
      t.references :specialist, foreign_key: true
      t.string     :client_name
      t.string     :client_phone
      t.string     :client_email
      t.timestamp  :start_time
      t.timestamp  :end_time
      # t.date       :date
      t.string     :canceled, default: false

      t.timestamps
    end
  end
end
