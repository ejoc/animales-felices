class Appointment < ApplicationRecord
  # belongs_to :client
  belongs_to :service
  belongs_to :specialist

  before_validation :set_end_time, on: [ :create, :update ]

  validates :start_time, presence: { message: "Debe seleccionar la fecha" }
  validates :specialist_id, presence: true
  validates :service_id, presence: true
  validates :client_name, presence: true
  validate do |appointment|
    AppointmentTimeValidator.new(appointment).validate
  end

  def self.report(periodicity = 'week')
    ## services = Service.all
    services = Service.where(id: SpecialistService.select(:service_id).distinct)
    select_clause = services.map{|s| "SUM(CASE WHEN service_id = #{s.id} THEN 1 ELSE 0 END) as \"#{s.name.underscore}\"" }
    query = <<-END_SQL
    WITH  grouped_tables AS (
      SELECT
        "appointments"."specialist_id",
        #{select_clause.join(', ')},
        count(*) AS counter
      FROM "appointments"
      WHERE start_time > date_trunc('#{periodicity}', current_date)
      AND end_time <= current_date
      AND canceled = false
      GROUP BY "appointments"."specialist_id"
      ORDER BY counter DESC
    )
    SELECT
      grouped_tables.*,
      people.name AS specialist
    FROM grouped_tables
    INNER JOIN "specialists" ON "specialists"."id" = "grouped_tables"."specialist_id"
    INNER JOIN "people" ON "people"."actable_id" = "specialists"."id" AND "people"."actable_type" = 'Specialist'
    END_SQL

    connection.execute(query)

    # Appointment.select('COUNT(*)').joins(specialist: :person).group(:specialist_id)
  end

  # SELECT
  #   to_char(start_time, 'MM') as mon,
  #     extract(year from start_time) as yyyy,
  #   (extract(year from start_time) || '-' || to_char(start_time, 'MM')) as yyyymm,
  #   SUM(items.price)
  # FROM appointments
  # INNER JOIN services ON services.id = appointments.service_id
  # INNER JOIN "items" ON "items"."actable_id" = "services"."id" AND "items"."actable_type" = 'Service'
  # WHERE start_time > date_trunc('month', NOW() - interval '12 month')
  # GROUP BY mon, yyyy
  # ORDER BY yyyymm
  def self.other_report
    query = <<-END_SQL
    SELECT
      to_char(start_time, 'MM') as mon,
      extract(year from start_time) as yyyy,
      (extract(year from start_time) || '-' || to_char(start_time, 'MM')) as yyyymm,
      items.name,
      SUM(items.price)
    FROM appointments
    INNER JOIN services ON services.id = appointments.service_id
    INNER JOIN "items" ON "items"."actable_id" = "services"."id" AND "items"."actable_type" = 'Service'
    WHERE start_time > date_trunc('month', NOW() - interval '12 month')
    AND end_time <= current_date
    AND canceled = false
    GROUP BY mon, yyyy, items.name
    ORDER BY yyyymm
    END_SQL

    res = connection.execute(query)
    res.group_by{|h| h["yyyymm"]}.map do |k, v|
      rr = v.map{|value| {value["name"] => value["sum"]}}.reduce(Hash.new, :merge)
      {yyyymm: k}.merge(rr)
    end
  end

  private
    def set_end_time
      # self.start_time = self.start_time + 2.second
      self.end_time = self.start_time + self.service.duration_min.minutes
    end
end

class AppointmentTimeValidator
  def initialize(appointment)
    @appointment = appointment
    @specialist = appointment.specialist
    @service = appointment.specialist
  end

  # .where.not(
  #   "start_time <= ? OR end_time <= ?",
  #   @appointment.end_time,
  #   @appointment.start_time,
  # )

  # .where(
  #   ':start_slot > start_time AND :start_slot < end_time OR :end_slot > start_time AND :end_slot < end_time',
  #   start_slot: @appointment.start_time, end_slot: @appointment.end_time
  # )
  def validate
    # @appointment.errors.add(:start_time, 'La fecha de la reservacion debe ser mayor a la fecha actual') if @appointment.start_time < Time.now
    if @appointment.start_time_changed?
      exists = @specialist.appointments
        .where(canceled: false)
        .where(
          ':start_slot < end_time AND :end_slot > start_time',
          start_slot: @appointment.start_time + 1.second,
          end_slot: @appointment.end_time - 1.second
        )
        .exists?
      @appointment.errors.add(:specialist, 'Ya existe una reservación en la fecha seleccionada') if exists
    end
    # if @appointment.start_time_changed?
    #   exists = @specialist.appointments
    #     .exists?([
    #       "canceled = ? AND start_time <= ? AND end_time >= ?",
    #       false,
    #       @appointment.start_time,
    #       @appointment.end_time
    #     ])
    #   # cambiar specialist por specialist_id
    #   @appointment.errors.add(:specialist, 'Ya existe una reservación en la fecha seleccionada') if exists
    # end

    # bussy_slots = @specialist.bussy_slots(@appointment.start_time, @service.duration_min)
    # is_bussy = bussy_slots.any? { |slot| slot.bussy && @appointment.start_time <= slot.slot && @appointment.end_time >= slot.slot }
  end
end

# WITH  grouped_tables AS (
#   SELECT
#     COUNT(*),
#     "appointments"."specialist_id",
#     "appointments"."service_id"
#   FROM "appointments"
#   WHERE start_time > date_trunc('#{periodicity}', current_date)
#   GROUP BY
#     "appointments"."specialist_id",
#     "appointments"."service_id"
#   )
# SELECT
#   grouped_tables.specialist_id,
#   people.name AS specialist,
#   items.name AS item,
#   count
# FROM grouped_tables
# INNER JOIN "services" ON "services"."id" = "grouped_tables"."service_id"
# INNER JOIN "items" ON "items"."actable_id" = "services"."id" AND "items"."actable_type" = 'Service'
# INNER JOIN "specialists" ON "specialists"."id" = "grouped_tables"."specialist_id"
# INNER JOIN "people" ON "people"."actable_id" = "specialists"."id" AND "people"."actable_type" = 'Specialist'