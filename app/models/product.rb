class Product < ApplicationRecord
  has_many :invoice_details, as: :item
end
