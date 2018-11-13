class AgendaController < ApplicationController
  def index
    # @specialists = Specialist.all
    @services = Service.all
    @specialists = SpecialistService
      .joins(specialist: :person)
      .select('people.id AS id, people.name, service_id')
      .where(active: true).load
    
    # @events = Appointment.joins(service: :item).select('appointments.id, appointments.client_name as title, items.name as desc, start_time as start, end_time as end').load
    @events = Appointment.joins(service: :item).select(
      'appointments.id',
      # "concat_ws(' - ', appointments.client_name, items.name) AS title",
      "appointments.client_name AS title",
      'items.name as desc',
      'start_time as start',
      'end_time as end',
      'appointments.specialist_id as resource_id',
      'appointments.service_id',
    ).load

    # render json: AppointmentSerializer.new(@events).serializable_hash[:data]
  end

  def show
    # render json: 
  end

  def appointment
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      # render json: "Reservación creada de manera exitosa!", status: :created #, location: @appointment
      # render :show, status: :created, location: @appointment
      render json: {
        id: @appointment.id,
        title: "#{@appointment.client_name} - #{@appointment.service.name}",
        start: @appointment.start_time,
        end: @appointment.end_time,
        desc: "#{@appointment.client_name} - #{@appointment.service.name}",
        resourceId: @appointment.specialist_id,
        }, status: :created
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
        # :end_time,
      )
    end
end