class Invoice < ApplicationRecord
  belongs_to :client
  belongs_to :specialist

  has_many :details, class_name: 'InvoiceDetail'

  accepts_nested_attributes_for :details

  before_validation :calculate_total
  validates :no, uniqueness: { message: 'Numero de factura ya ha sido registrado' }
 
  private
    def calculate_total
      self.sub_total = self.details.map{|i| i.price_total }.sum()
      self.iva = self.sub_total * Rails.configuration.iva
      self.total = self.sub_total + self.iva
    end
end
