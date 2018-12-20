class Supplier < ApplicationRecord
  acts_as :person
  belongs_to :company

  cattr_reader :genders do
    ["male", "female"]
  end

  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :cedula, uniqueness: true
end
