module Admin
  class ServicesController < Admin::ApplicationController
    def index
      search_term = params[:search].to_s.strip
      resources = Service.joins(:item).where('items.name ILIKE ?', "%#{search_term}%")
      resources = resources.page(params[:page]).per(records_per_page)
      page = Administrate::Page::Collection.new(dashboard, order: order)

      render locals: {
        resources: resources,
        search_term: search_term,
        page: page,
        show_search_bar: show_search_bar?,
      }
    end
  end
end
