class ServiceSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :name, :description, :duration_min

  set_type :service
end
