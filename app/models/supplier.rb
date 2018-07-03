class Supplier < ApplicationRecord
  acts_as :person
  belongs_to :company

  cattr_reader :genders do
    ["male", "female"]
  end
end
