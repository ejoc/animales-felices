module ApplicationHelper
  def default_props
    @default_props ||= {
      userSignedIn: user_signed_in?,
      currentUser: current_user && current_user.email,
      flashMessages: flash_messages,
    }
  end

  def flash_messages
    flash.map do |type, text|
      { id: text.object_id, type: type, text: text }
    end
  end
end
