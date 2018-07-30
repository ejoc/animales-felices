class Service < ApplicationRecord
  acts_as :item
  # has_many :invoice_details, as: :item
  has_many :specialist_services
  # has_many :specialists, through: :specialist_service
end
