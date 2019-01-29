class ServiceSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :name, :description, :duration_min, :price

  attribute :specialists do |object, params|
    if params[:current_user].admin?
      object.specialist_services.pluck(:specialist_id).map(&:to_s)
    else
      object.specialist_services
        .where(specialist_id: params[:current_user].specialist.id)
        .pluck(:specialist_id)
        .map(&:to_s)
    end
  end

  attribute :item_id do |object|
    object.item.id
  end

  set_type :service
end
