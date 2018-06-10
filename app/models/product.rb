class Product < ApplicationRecord
  acts_as :item
  # has_many :invoice_details, as: :item
end
