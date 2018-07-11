class SpecialistsController < ApplicationController
  def index
    @specialists = Specialist.all

    render json: @specialists
  end
end