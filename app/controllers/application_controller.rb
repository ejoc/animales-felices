class ApplicationController < ActionController::Base

  private
    def records_per_page
      params[:per_page] || 20
    end
end
