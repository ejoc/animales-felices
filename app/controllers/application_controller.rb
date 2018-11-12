class ApplicationController < ActionController::Base

  private
    def records_per_page
      params[:per_page] || 20
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
end
