class AppointmentSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :client_name, :client_phone, :client_email, :start_time

  # belongs_to :service
  # belongs_to :specialist


  # set_type :appointment

  attribute :service do |object|
    {
      id: object.service.id,
      name: object.service.name,
      duration_min: object.service.duration_min,
    }
  end

  attribute :specialist do |object|
    {
      id: object.specialist.id,
      name: object.specialist.name,
    }
  end

  attribute :canceled do |record|
    # The director will be serialized only if the :admin key of params is true
    record.canceled
  end

end
