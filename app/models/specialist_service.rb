class SpecialistService < ApplicationRecord
  belongs_to :specialist
  belongs_to :service

  validates_uniqueness_of :service_id, scope: :specialist_id
end
