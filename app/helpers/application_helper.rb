module ApplicationHelper
  def default_props
    @default_props ||= {
      currentUser: current_user && current_user.email,
    }
  end
end
