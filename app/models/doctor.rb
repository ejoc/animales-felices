class Doctor < ApplicationRecord
  acts_as :person
  belongs_to :user, optional: true

  cattr_reader :genders do
    ["male", "female"]
  end
end
