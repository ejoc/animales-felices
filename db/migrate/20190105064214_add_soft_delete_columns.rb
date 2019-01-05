class AddSoftDeleteColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :discarded_at, :datetime
    add_index :products, :discarded_at

    add_column :services, :discarded_at, :datetime
    add_index :services, :discarded_at

    add_column :companies, :discarded_at, :datetime
    add_index :companies, :discarded_at

    add_column :suppliers, :discarded_at, :datetime
    add_index :suppliers, :discarded_at

    add_column :product_categories, :discarded_at, :datetime
    add_index :product_categories, :discarded_at

    add_column :unit_types, :discarded_at, :datetime
    add_index :unit_types, :discarded_at

    add_column :specialists, :discarded_at, :datetime
    add_index :specialists, :discarded_at
  end
end
