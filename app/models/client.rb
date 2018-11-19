class Client < ApplicationRecord
  acts_as :person

  cattr_reader :genders do
    ["male", "female"]
  end

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
end
