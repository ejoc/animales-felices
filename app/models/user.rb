class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  include Discard::Model
  # default_scope -> { kept }
  has_one :specialist

  accepts_nested_attributes_for :specialist

  def active_for_authentication?
    # Uncomment the below debug statement to view the properties of the returned self model values.
    # logger.debug self.to_yaml
    super && !discarded?
  end

  def inactive_message
    !discarded? ? super : :account_inactive
  end

  # after_discard do
  #   specialist.discard
  # end

  # after_undiscard do
  #   specialist.undiscard
  # end

  def active
    !discarded?
  end
end
