class AddRemarkToAppointments < ActiveRecord::Migration[5.2]
  def change
    add_column :appointments, :remark, :text
  end
end
