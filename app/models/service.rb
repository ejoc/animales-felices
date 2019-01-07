class Service < ApplicationRecord
  include Discard::Model
  default_scope -> { kept }
  
  acts_as :item
  # has_many :invoice_details, as: :item
  has_many :specialist_services, -> { where active: true }

  validates :duration_min, numericality: true
end
