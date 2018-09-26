require "administrate/base_dashboard"

class SupplierDashboard < Administrate::BaseDashboard
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
    # gender: GenderField,
    company: Field::BelongsTo,
    company_role: Field::String,
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
    # :gender,
    :company,
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
    # :gender,
    :company,
    :company_role,
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
    # :gender,
    :company,
    :company_role,
  ].freeze

  # Overwrite this method to customize how suppliers are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(supplier)
    # "Supplier ##{supplier.id}"
    supplier.name
  end
end
