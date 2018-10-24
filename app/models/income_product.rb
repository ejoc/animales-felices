class IncomeProduct < ApplicationRecord
  belongs_to :supplier
  belongs_to :specialist

  has_many :details, class_name: 'IncomeProductDetail'

  accepts_nested_attributes_for :details

  before_validation :ensure_calculate_values
 
  private
    def ensure_calculate_values
      self.sub_total = self.details.inject(0){|acc, item| acc += item.price_total }
      self.iva = (Rails.configuration.iva * self.sub_total)
      self.total = self.sub_total + self.iva
    end

end