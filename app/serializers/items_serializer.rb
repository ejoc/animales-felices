class ItemsSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :name, :description, :price

  

  set_type :item
end
