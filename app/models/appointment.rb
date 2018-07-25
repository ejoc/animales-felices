class Appointment < ApplicationRecord
  # belongs_to :client
  belongs_to :service
  belongs_to :specialist

  before_validation :set_end_time, on: [ :create, :update ]

  private
    def set_end_time
      # self.start_time = self.start_time + 2.second
      self.end_time = self.start_time + self.service.duration_min.minutes
    end
end
