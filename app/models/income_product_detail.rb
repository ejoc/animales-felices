class IncomeProductDetail < ApplicationRecord
  belongs_to :income_product
  belongs_to :product #, polymorphic: true
end