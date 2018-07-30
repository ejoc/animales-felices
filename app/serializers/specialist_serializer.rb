class SpecialistSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :name

  set_type :specialist
end
