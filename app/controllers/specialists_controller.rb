class SpecialistsController < ApplicationController
  before_action :set_specialist, only: [:bussy_slots]

  def index
    @specialists = Specialist.all

    render json: @specialists
  end

  def bussy_slots
    sleep 1
    time = Time.strptime(params[:date], '%Y-%m-%d')
    # time = Time.new(2018,8,6)
    duration_min = params[:duration_min].to_i
    @bussy_slots = @specialist.bussy_slots(time, duration_min)
    render json: @bussy_slots 
  end

  private
    def set_specialist
      @specialist = Specialist.find(params[:id])
    end
end