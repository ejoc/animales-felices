require 'ffaker'
require 'awesome_print'

task :seed_appoinments => :environment do

  services = Service.all
  specialist_ids = Specialist.pluck(:id)

  service_size = services.size
  specialist_size = specialist_ids.size

  start_date = Date.today - 3.month
  end_date = Date.today

  # my_days = [1,2,3,4,5,6]
  # dates = (start_date..end_date).to_a.select {|k| my_days.include?(k.wday)}

  hours = (8..18).to_a
  minutes_for_service = {}
  services.each do |s|
    minutes_for_service[s.id] = (0..60).step(s.duration_min).to_a
    minutes_for_service[s.id].pop
  end  

  # t.change({ hour: 16 })

  250.times do
    selected_service = services[Random.rand(service_size)]
    start_time = FFaker::Time.between(start_date, end_date)
    start_time = start_time.change({
      hour: hours.sample,
      min: minutes_for_service[selected_service.id].sample
    })
    appointment = Appointment.new({
      service_id: selected_service.id,
      specialist_id: specialist_ids[Random.rand(specialist_size)],
      client_name: FFaker::Name.name,
      client_phone: FFaker::PhoneNumber.short_phone_number,
      client_email: FFaker::Internet.email,
      start_time: start_time,
      end_time: start_time + (selected_service.duration_min).minutes ,
    })

    if appointment.valid?
      appointment.save
    else
      ap appointment.errors
    end
  end
end