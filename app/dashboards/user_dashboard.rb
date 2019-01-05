require "administrate/base_dashboard"

class UserDashboard < Administrate::BaseDashboard
  
  READ_ONLY_ATTRIBUTES = [ :id ]

  ATTRIBUTE_TYPES = {
    id: Field::Number,
    email: Field::String,
    password: Field::Password,
    specialist: Field::HasOne
  }.freeze

  COLLECTION_ATTRIBUTES = [
    :id,
    :email,
    :specialist,
  ]

  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys

  FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys - READ_ONLY_ATTRIBUTES

  def display_resource(user)
    user.email
  end
end
