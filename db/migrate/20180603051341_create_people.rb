class CreatePeople < ActiveRecord::Migration[5.2]
  def up
    execute <<-SQL
      CREATE TYPE gender AS ENUM ('male', 'female');
    SQL
    create_table :people do |t|
      t.string :name
      t.string :email
      t.string :address
      t.string :phone
      t.column :gender, :gender

      t.actable
      t.timestamps
    end
  end
end
