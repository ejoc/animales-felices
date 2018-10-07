class PagesController < ApplicationController
  def agenda
    @services = Service.all

    @specialists = Specialist.joins(:person).select(
      'people.name',
    )

    @specialists_by_service = SpecialistService.select('specialist_id', 'service_id')
      .where(active: true)

    # render json: ServiceSerializer.new(@services)
  end

  def invoice
    @items = Item.all

    @specialists = Specialist.joins(:person).select(
      'people.name',
    )
  end

  def purchase_invoice
    @items = Item.all

    @specialists = Specialist.joins(:person).select(
      'people.name',
    )
  end
end