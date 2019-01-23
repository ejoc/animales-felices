module Admin
  class SuppliersController < Admin::ApplicationController
    def valid_action?(name, resource = resource_class)
      %w[destroy].exclude?(name.to_s) && super
    end
  end
end
