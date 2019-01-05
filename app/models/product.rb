class Product < ApplicationRecord
  include Discard::Model
  acts_as :item

  belongs_to :unit_type
  belongs_to :product_category

  has_one :stock, class_name: 'StockProduct'

  
  # has_many :invoice_details, as: :item
end
