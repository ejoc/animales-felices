require "administrate/base_dashboard"

class ClientDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    # actable: Field::Polymorphic,
    # person: Field::HasOne,
    id: Field::Number,
    name: Field::String,
    address: Field::String,
    phone: Field::String,
    gender: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    # :actable,
    # :person,
    :id,
    :name,
    :address,
    :phone,
    :gender,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    # :actable,
    # :person,
    :id,
    :name,
    :address,
    :phone,
    :gender,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    # :actable,
    # :person,
    :name,
    :address,
    :phone,
    :gender,
  ].freeze

  # Overwrite this method to customize how clients are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(client)
  #   "Client ##{client.id}"
  # end
end
