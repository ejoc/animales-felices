class Specialist < ApplicationRecord
  include Discard::Model
  default_scope -> { kept }

  acts_as :person
  belongs_to :user, optional: true
  has_many :appointments

  # scope :kept, -> { undiscarded.joins(:user).merge(User.kept) }

  # validates :name, :email, :presence => true
  # validates :email, :presence => true

  # horario de entrada y salida
  def schedule
    @schedule ||= {
      start: 8,
      end:  20,
    }
  end

  cattr_reader :genders do
    ["male", "female"]
  end

  def bussy_slots(date, duration_min)
    b_slots = appointments.where('start_time > ? AND end_time < ?', date.beginning_of_day, date.end_of_day)
      .where(canceled: false)
      .pluck(:start_time, :end_time).map {|bussy_slot| (bussy_slot[0]..bussy_slot[1]) }
    
    (date.change(hour: schedule[:start]).to_i .. date.change(hour: schedule[:end]).to_i)
      .step(duration_min.minutes)
      .map do |date|
        slot = Time.at(date)
        end_slot = slot + duration_min.minutes
        bussy = false
        b_slots.each do |bussy_slot|
          # if (bussy_slot.cover?(slot + 1.second))
          #   bussy = true
          #   next
          # end
          if (bussy_slot.first - end_slot) * (slot - (bussy_slot.end - 1.second)) > 0
            bussy = true
            next
          end
        end
        {
          slot: slot,
          bussy: bussy
        }
      end
  end

  def free_slots(date)
    appointments.where('start_time > ? AND end_time < ?', date.beginning_of_day, date.end_of_day)
      .where(canceled: true)
      .pluck(:start_time)
  end
end