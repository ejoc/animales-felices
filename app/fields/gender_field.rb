require "administrate/field/base"

class GenderField < Administrate::Field::Base
  def to_s
    data.humanize unless data.nil?
  end
end
