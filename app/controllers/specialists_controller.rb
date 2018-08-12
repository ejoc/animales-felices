class SpecialistsController < ApplicationController
  before_action :set_specialist, only: [:check_availability]

  def index
    @specialists = Specialist.all

    render json: @specialists
  end

  def check_availability
    
  end

  private
    def set_specialist
      @specialist = Specialist.find(params[:id])
    end
end