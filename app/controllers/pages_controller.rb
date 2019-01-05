class PagesController < ApplicationController
  before_action :authenticate_user!

  def agenda
    if current_user.admin?
      @specialists = Specialist.joins(:person).select('people.name')
      @services = Service.all
      @specialists_by_service = SpecialistService.select('specialist_id', 'service_id')
      .where(active: true)
    else
      @specialists = Specialist.joins(:person).select('people.name')
        .where('specialists.id = ?', current_user.specialist.id)
      @services = Service.joins(:specialist_services)
        .where('specialist_services.specialist_id = ?', current_user.specialist.id)

      @specialists_by_service = SpecialistService.select('specialist_id', 'service_id')
        .where(active: true)
        .where(specialist_id: current_user.specialist.id)
    end
    # render json: ServiceSerializer.new(@services)
  end

  def invoice
    @items = Item.all

    @specialists = Specialist.joins(:person).select('people.name')
  end

  def purchase_invoice
    @items = Item.all

    @specialists = Specialist.joins(:person).select(
      'people.name',
    )
  end

  def statistical_reports
  end

  def sales_reports
  end

  def account
  end
end