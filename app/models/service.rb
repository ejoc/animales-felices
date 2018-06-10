class Service < ApplicationRecord
  has_many :invoice_details, as: :item
end
