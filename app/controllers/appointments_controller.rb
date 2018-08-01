class AppointmentsController < ApplicationController
  before_action :set_appointment, only: [:show, :edit, :update, :destroy, :cancel]
  before_action :set_specialist, only: [:show, :edit, :create, :update, :destroy]

  # agregar funcionalidad para buscar reservaciones por specialista o todo
  def index
    # @specialists = Specialist.all
    @services = Service.all
    # @specialists = SpecialistService
    #   .joins(specialist: :person)
    #   .select('people.name, service_id')
    #   .where(active: true).load

    @specialists = Specialist.joins(:person).select(
      'people.name',
    )

    @specialists_by_service = SpecialistService.select('specialist_id', 'service_id')
    
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
    # sleep 2
    render json: AppointmentSerializer.new(@appointment)
  end

  def create
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      # render json: "Reservación creada de manera exitosa!", status: :created #, location: @appointment
      # render :show, status: :created, location: @appointment
      render json: {
        id: @appointment.id,
        title: @appointment.client_name,
        start: @appointment.start_time,
        end: @appointment.end_time,
        desc: @appointment.service.name,
        resourceId: @appointment.specialist_id,
        serviceId: @appointment.service_id,
        }, status: :created
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def cancel
    @appointment.canceled = true
    if @appointment.save
      render json: 'cancelado exitosamente', status: :ok
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def specialists_by_service
    @specialists_by_service = SpecialistService.select('specialist_id', 'service_id')
    
    render json: @specialists_by_service
  end

  private
    def set_appointment
      @appointment = Appointment.find(params[:id])
    end

    def set_specialist
      @specialist = Specialist.find(params[:specialist_id])
    end

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

# SELECT services.id, items.name
#      , json_agg(json_build_object('id', specialists.id, 'name', people.name)) AS item
# FROM   specialist_services
# JOIN   services ON services.id = specialist_services.service_id
# JOIN   items ON items.actable_id = services.id
# JOIN   specialists ON specialists.id = specialist_services.specialist_id
# JOIN   people ON people.actable_id = specialists.id
# WHERE  specialist_services.active = true
# GROUP  BY services.id, items.name;	