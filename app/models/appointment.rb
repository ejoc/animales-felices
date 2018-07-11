class Appointment < ApplicationRecord
  belongs_to :client
  belongs_to :service
  belongs_to :specialist
end
