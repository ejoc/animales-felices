require "administrate/base_dashboard"

class ProductDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    # actable: Field::Polymorphic,
    # item: Field::HasOne,
    id: Field::Number,
    name: Field::String,
    description: Field::String,
    price: Field::Number.with_options(prefix: "USD", decimals: 2),
    brand: Field::String,
    unit_type: Field::BelongsTo,
    product_category: Field::BelongsTo,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    # :actable,
    # :item,
    :id,
    :name,
    # :description,
    :price,
    :brand,
    :unit_type,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    # :actable,
    # :item,
    :id,
    :name,
    :description,
    :price,
    :brand,
    :unit_type,
    :product_category,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    # :actable,
    # :item,
    :name,
    :description,
    :price,
    :brand,
    :unit_type,
    :product_category,
  ].freeze

  # Overwrite this method to customize how products are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(product)
    product.name
  end
end
