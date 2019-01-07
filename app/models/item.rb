class Item < ApplicationRecord
  actable

  validates_presence_of :name, :price
  validates :price, numericality: true
end
