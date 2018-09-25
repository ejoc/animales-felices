class IncomeProduct < ApplicationRecord
  belongs_to :supplier
  belongs_to :specialist

  has_many :details, class_name: 'IncomeProductDetail'

  accepts_nested_attributes_for :details
end