class InvoiceSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes(
    :client_name,
    :client_phone,
    :client_email,
    :start_time,
    :end_time,
    :specialist_id,
    :service_id,
    :canceled
  )

  # set_type :appointment

  # attribute :title do |object|
  #   object.client_name
  # end

end
