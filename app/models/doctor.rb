class Doctor < ApplicationRecord
  acts_as :person
  belongs_to :user, optional: true
end
