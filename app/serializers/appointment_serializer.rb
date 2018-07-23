class AppointmentSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :title, :desc, :start, :end, :resource_id, :service_id

  # set_type :appointment

  # attribute :title do |object|
  #   "#{object.name} (#{object.year})"
  # end

end
