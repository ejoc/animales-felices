class Client < ApplicationRecord
  acts_as :person

  cattr_reader :genders do
    ["male", "female"]
  end

  validates :cedula, uniqueness: true
end
