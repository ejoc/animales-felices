require "administrate/base_dashboard"

class AppointmentDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    client: Field::BelongsTo,
    service: Field::BelongsTo,
    doctor: Field::BelongsTo,
    id: Field::Number,
    date: Field::DateTime,
    start_time: Field::Time,
    end_time: Field::Time,
    status: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :client,
    :service,
    :doctor,
    :id,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :client,
    :service,
    :doctor,
    :id,
    :date,
    :start_time,
    :end_time,
    :status,
    :created_at,
    :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :client,
    :service,
    :doctor,
    :date,
    :start_time,
    :end_time,
    :status,
  ].freeze

  # Overwrite this method to customize how appointments are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(appointment)
  #   "Appointment ##{appointment.id}"
  # end
end
