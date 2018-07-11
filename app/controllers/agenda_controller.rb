class AgendaController < ApplicationController
  def index
    # @specialists = Specialist.all
    @services = Service.all
    @specialists = SpecialistService
      .joins(specialist: :person)
      .select('people.id AS id, people.name, service_id')
      .where(active: true).load
  end

  def appointment
    @appointment = Appointment.new(appointment_params)
    if @contact.save
      render json: :show, status: :created, location: @contact
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  private
    def appointment_params
      params.require(:appointment).permit(
        :service_id,
        :client_id,
        :specialist_id,
        :date,
        :start_time,
        :end_time,
      )
    end
end