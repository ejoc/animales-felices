class Supplier < ApplicationRecord
  acts_as :person
  belongs_to :company
end
