class UnitType < ApplicationRecord
  include Discard::Model
  default_scope -> { kept }

  validates_presence_of :name
end