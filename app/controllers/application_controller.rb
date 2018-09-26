class ApplicationController < ActionController::Base

  private
    def records_per_page
      params[:per_page] || 20
    end

    def search_params
      params[:search] || false
    end
end
