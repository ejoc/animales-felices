class ServiceSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :name, :description, :duration_min, :price

  attribute :specialists do |object|
    object.specialist_services.pluck(:specialist_id).map(&:to_s)
  end

  attribute :item_id do |object|
    object.item.id
  end

  set_type :service
end
