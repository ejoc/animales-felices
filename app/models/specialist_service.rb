class SpecialistService < ApplicationRecord
  belongs_to :specialist
  belongs_to :service

  validates_uniqueness_of :service_id, scope: :specialist_id

  def self.specialists_by_service
    self
      .joins(specialist: :person, service: :item)
      .select(
        'services.id',
        'items.name',
        Arel.sql("json_agg(json_build_object('id', #{self.connection.quote_string('specialists.id')}, 'name', #{self.connection.quote_string('people.name')})) AS specialists"),
      )
      .where(active: true)
      .group("services.id", "items.name")
  end
end
