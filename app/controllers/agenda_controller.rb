class AgendaController < ApplicationController
  def index

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
        :doctor_id,
        :date,
        :start_time,
        :end_time,
      )
    end
end