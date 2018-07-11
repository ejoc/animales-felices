class AgendaController < ApplicationController
  def index
    # @specialists = Specialist.all
    @services = Service.all
    @specialists = SpecialistService
      .joins(specialist: :person)
      .select('people.id AS id, people.name, service_id')
      .where(active: true).load
    
    @events = Appointment.joins(service: :item).select('appointments.id, items.name as title, start_time as start, end_time as end').load
  end

  def appointment
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      render json: "Reservación creada de manera exitosa!", status: :created #, location: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  private
    def appointment_params
      params.require(:appointment).permit(
        :service_id,
        :specialist_id,
        :client_name,
        :client_email,
        :client_phone,
        # :date,
        :start_time,
        :end_time,
      )
    end
end