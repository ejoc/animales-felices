class Service < ApplicationRecord
  acts_as :item
  # has_many :invoice_details, as: :item
  has_many :specialist_services, -> { where active: true }
end
