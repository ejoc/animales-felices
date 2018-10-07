class ProductsSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :id, :name, :description, :price

  
  attribute :stock do |object|
    stock = object.stock
    stock ? stock.stock : 0
  end

  set_type :product
end
