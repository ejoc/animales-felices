require "administrate/base_dashboard"

class SpecialistDashboard < Administrate::BaseDashboard
  READ_ONLY_ATTRIBUTES = [ :id ]


  ATTRIBUTE_TYPES = {
    # actable: Field::Polymorphic,
    # person: Field::HasOne,
    id: Field::Number,
    name: Field::String,
    email: Field::String,
    address: Field::String,
    phone: Field::String,
    # gender: GenderField,
    # user: Field::BelongsTo,
  }.freeze

  COLLECTION_ATTRIBUTES = [
    # :actable,
    # :person,
    :id,
    :name,
    :email,
    :address,
    :phone,
    # :gender,
    # :user,
  ].freeze

  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys

  FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys - READ_ONLY_ATTRIBUTES

  def display_resource(specialist)
    specialist.name
  end
end
