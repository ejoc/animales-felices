class PagesController < ApplicationController
  def agenda
    @services = Service.all

    @specialists = Specialist.joins(:person).select(
      'people.name',
    )

    @specialists_by_service = SpecialistService.select('specialist_id', 'service_id')
      .where(active: true)
  end
end