class Product < ApplicationRecord
  acts_as :item

  belongs_to :unit_type
  belongs_to :product_category
  # has_many :invoice_details, as: :item
end
