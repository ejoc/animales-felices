class Person < ApplicationRecord
  actable

  cattr_reader :genders do
    ["male", "female"]
  end

  validates :name, :presence => true
  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  # def self.genders
  #   connection.execute("SELECT e.enumlabel AS enum_value FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid  WHERE t.typname = 'gender'")
  # end
end
