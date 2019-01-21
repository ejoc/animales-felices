class ApplicationController < ActionController::Base

  private
    def records_per_page
      params[:per_page] || 10
    end

    def search_params
      params[:search] || false
    end

    def camelize_response(props)
      case props
      when Hash
        props.each_with_object({}) do |(key, value), new_props|
          new_key = key.to_s.camelize(:lower)
          new_value = camelize_response(value)
          new_props[new_key] = new_value
        end
      when Array
        props.map { |item| camelize_response(item) }
      else
        props
      end
    end

    def not_found
      raise ActionController::RoutingError.new('Not Found')
    end

    def authenticate_admin
      (current_user && current_user.admin?) || not_found
    end
end
