class Appointment < ApplicationRecord
  # belongs_to :client
  belongs_to :service
  belongs_to :specialist

  before_validation :set_end_time, on: [ :create, :update ]

  validates :start_time, presence: { message: "Debe seleccionar la fecha" }
  validates :specialist_id, presence: true
  validates :service_id, presence: true
  validates :client_name, presence: true
  validate do |appointment| 
    AppointmentTimeValidator.new(appointment).validate
  end

  private
    def set_end_time
      # self.start_time = self.start_time + 2.second
      self.end_time = self.start_time + self.service.duration_min.minutes
    end
end

class AppointmentTimeValidator
  def initialize(appointment)
    @appointment = appointment 
    @specialist = appointment.specialist
  end

  def validate
    @appointment.errors.add(:start_time, 'La fecha de la reservacion debe ser mayor a la fecha actual') if @appointment.start_time < Time.now
    if @appointment.start_time_changed?
      exists = @specialist.appointments
        .exists?(["canceled = ? AND start_time <= ? AND end_time >= ?", false, @appointment.start_time, @appointment.end_time])
      # cambiar specialist por specialist_id
      @appointment.errors.add(:specialist, 'Ya existe una reservación en la fecha seleccionada') if exists
    end
  end
end