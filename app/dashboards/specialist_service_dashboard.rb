require "administrate/base_dashboard"

class SpecialistServiceDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    specialist: Field::BelongsTo,
    service: Field::BelongsTo,
    active: Field::Boolean,
    # user: Field::BelongsTo,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :id,
    :specialist,
    :service,
    :active,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    # :id,
    :specialist,
    :service,
    :active,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :specialist,
    :service,
    :active,
  ].freeze

  # Overwrite this method to customize how specialists are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(specialist_service)
    "#{specialist_service.specialist.name} - #{specialist_service.service.name}"
  end
end
