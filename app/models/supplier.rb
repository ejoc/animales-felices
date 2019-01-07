class Supplier < ApplicationRecord
  include Discard::Model
  default_scope -> { kept }

  acts_as :person
  belongs_to :company

  cattr_reader :genders do
    ["male", "female"]
  end

  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :cedula, uniqueness: true
end
