# require 'ffaker'
# require 'awesome_print'

task :seed_appoinments => :environment do
  # puts "hello"

  # services = Service.all
  # specialist_ids = Specialist.pluck(:id)

  # service_size = services.size
  # specialist_size = specialist_ids.size

  # start_date = Date.today - 3.month
  # end_date = Date.today

  # # my_days = [1,2,3,4,5,6]
  # # dates = (start_date..end_date).to_a.select {|k| my_days.include?(k.wday)}

  # hours = (8..18).to_a
  # minutes_for_service = {}
  # services.each do |s|
  #   minutes_for_service[s.id] = (0..60).step(s.duration_min).to_a
  #   minutes_for_service[s.id].pop
  # end  

  # # t.change({ hour: 16 })

  # 250.times do
  #   selected_service = services[Random.rand(service_size)]
  #   start_time = FFaker::Time.between(start_date, end_date)
  #   start_time = start_time.change({
  #     hour: hours.sample,
  #     min: minutes_for_service[selected_service.id].sample
  #   })
  #   appointment = Appointment.new({
  #     service_id: selected_service.id,
  #     specialist_id: specialist_ids[Random.rand(specialist_size)],
  #     client_name: FFaker::Name.name,
  #     client_phone: FFaker::PhoneNumber.short_phone_number,
  #     client_email: FFaker::Internet.email,
  #     start_time: start_time,
  #     end_time: start_time + (selected_service.duration_min).minutes ,
  #   })

  #   if appointment.valid?
  #     appointment.save
  #   else
  #     p appointment.errors
  #   end
  # end

  peluqueria_normal = Service.find_by(name: 'Peliqueria (baño normal)')
  peluqueria_medicado = Service.find_by(name: 'Peliqueria (baño medicado)')

  mafer = Specialist.find_by(name: 'Maria Fernanada')

  puts mafer.name

  # puts peluqueria_normal.name
  # puts peluqueria_medicado.name

  appointments = [
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Carlos Julán',
      client_phone: '0995624456',
      start_time: Time.new(2018, 11, 5, 9),
      end_time: Time.new(2018, 11, 5, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Tomy\n- __Especie__: Canina\n- __Raza__: French\n- __Color__: Caramelo",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Mercedes Suárez',
      client_phone: '0939161591',
      start_time: Time.new(2018, 11, 5, 10),
      end_time: Time.new(2018, 11, 5, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Osito\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Carlos Pastor',
      client_phone: '0994362593',
      start_time: Time.new(2018, 11, 6, 9),
      end_time: Time.new(2018, 11, 6, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Dolas\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Raul Marchan',
      client_phone: '2935684',
      start_time: Time.new(2018, 11, 6, 10),
      end_time: Time.new(2018, 11, 6, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Milu\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra\n- __Color__: Blanco"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Javier Molina',
      client_phone: '0993305717',
      start_time: Time.new(2018, 11, 6, 12),
      end_time: Time.new(2018, 11, 6, 12) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Pitu\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Cesar Tapia',
      client_phone: '0979802929',
      start_time: Time.new(2018, 11, 6, 13),
      end_time: Time.new(2018, 11, 6, 13) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Cuicui\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra\n- __Color__: Blanco"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Pedro Gong',
      client_phone: '0997381693',
      start_time: Time.new(2018, 11, 6, 14),
      end_time: Time.new(2018, 11, 6, 14) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Manty\n- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Hembra\n- __Color__: Gris"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Rita Muñoz',
      client_phone: '0992289372',
      start_time: Time.new(2018, 11, 6, 15),
      end_time: Time.new(2018, 11, 6, 15) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Raza__: Coquer"
    },

    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Peter Villamar',
      client_phone: '0990145121',
      start_time: Time.new(2018, 11, 7, 9),
      end_time: Time.new(2018, 11, 7, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Tina\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Dario Aviles',
      client_phone: '3082520',
      start_time: Time.new(2018, 11, 8, 9),
      end_time: Time.new(2018, 11, 8, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Sasha\n- __Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Macho\n- __Color__: Negro"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Patricia Holguin',
      client_phone: '0981239986',
      start_time: Time.new(2018, 11, 9, 9),
      end_time: Time.new(2018, 11, 9, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Minie\n- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Hembra"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Jose Zamora',
      client_phone: '0967779925',
      start_time: Time.new(2018, 11, 9, 10),
      end_time: Time.new(2018, 11, 9, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Kesly\n- __Especie__: Canina\n- __Raza__: Golden\n- __Sexo__: Hembra\n- __Color__: Cafe"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Dario Aviles',
      client_phone: '3032520',
      start_time: Time.new(2018, 11, 9, 11),
      end_time: Time.new(2018, 11, 9, 11) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Ariel\n- __Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Macho\n- __Color__: Cafe"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Dario Aviles',
      client_phone: '3032520',
      start_time: Time.new(2018, 11, 9, 12),
      end_time: Time.new(2018, 11, 9, 12) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Ariel\n- __Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Macho\n- __Color__: Cafe"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Sin nombre',
      client_phone: '0939737488',
      start_time: Time.new(2018, 11, 9, 13),
      end_time: Time.new(2018, 11, 9, 13) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Blocky\n- __Especie__: Canina\n- __Raza__: Schuauzer"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Juan Carlos Andrade',
      client_phone: '0994194696',
      start_time: Time.new(2018, 11, 9, 14),
      end_time: Time.new(2018, 11, 9, 14) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Thor\n- __Especie__: Canina\n- __Raza__: Pug\n- __Sexo__: Macho\n- __Color__: Cafe"
    },

    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Hellen Pacheco',
      client_phone: '2937292',
      start_time: Time.new(2018, 11, 10, 9),
      end_time: Time.new(2018, 11, 10, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Blanquita\n- __Especie__: Canina\n- __Sexo__: Macho"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Carlos Castillo',
      client_phone: '0994463200',
      start_time: Time.new(2018, 11, 10, 10),
      end_time: Time.new(2018, 11, 10, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Ringo\n- __Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Macho"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Maria Mejia',
      client_phone: '0958823180',
      start_time: Time.new(2018, 11, 10, 11),
      end_time: Time.new(2018, 11, 10, 11) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Paquita\n- __Especie__: Canina\n- __Raza__: Salchicha\n- __Sexo__: Hembra"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Maria Mejia',
      client_phone: '0958823180',
      start_time: Time.new(2018, 11, 10, 12),
      end_time: Time.new(2018, 11, 10, 12) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Paquita\n- __Especie__: Canina\n- __Raza__: Salchicha\n- __Sexo__: Hembra"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Patricia Morales',
      client_phone: '0999134049',
      start_time: Time.new(2018, 11, 10, 13),
      end_time: Time.new(2018, 11, 10, 13) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Nano\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Katty Sanchez',
      client_phone: '0993925386',
      start_time: Time.new(2018, 11, 10, 14),
      end_time: Time.new(2018, 11, 10, 14) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Jake\n- __Especie__: Canina\n- __Raza__: JackRussel\n- __Sexo__: Macho"
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Jean Carlos Lino',
      client_phone: '0993925386',
      start_time: Time.new(2018, 11, 10, 15),
      end_time: Time.new(2018, 11, 10, 15) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Bethoven\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Melanie Espinel',
      client_phone: '2177816',
      start_time: Time.new(2018, 11, 10, 16),
      end_time: Time.new(2018, 11, 10, 16) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Floppy\n- __Especie__: Canina\n- __Raza__: Shitzu",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Ericka Chevasco',
      client_phone: '0992272185',
      start_time: Time.new(2018, 11, 10, 17),
      end_time: Time.new(2018, 11, 10, 17) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Blanco\n- __Especie__: Canina\n- __Raza__: French",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Mariana Borja',
      client_phone: '0984194496',
      start_time: Time.new(2018, 11, 10, 18),
      end_time: Time.new(2018, 11, 10, 18) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Capuchino\n- __Especie__: Canina\n- __Raza__: French",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Ma. Fernanda Bohorquez',
      client_phone: '0986951123',
      start_time: Time.new(2018, 11, 10, 19),
      end_time: Time.new(2018, 11, 10, 19) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Mila\n- __Especie__: Canina\n- __Raza__: Shitzu",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Melanie Espinel',
      client_phone: '2177816',
      start_time: Time.new(2018, 11, 10, 20),
      end_time: Time.new(2018, 11, 10, 20) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Catrina",
    },

    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Joselyn Gonzalez',
      client_phone: '0988058057',
      start_time: Time.new(2018, 11, 12, 9),
      end_time: Time.new(2018, 11, 12, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Jake\n- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Macho",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Jazmin Rivas',
      client_phone: '0994177261',
      start_time: Time.new(2018, 11, 12, 10),
      end_time: Time.new(2018, 11, 12, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Luna\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Jose Zamora',
      client_phone: '0967779925',
      start_time: Time.new(2018, 11, 13, 9),
      end_time: Time.new(2018, 11, 13, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Perris y Puffi\n- __Especie__: Canina",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'July Barrios',
      client_phone: '0995594574',
      start_time: Time.new(2018, 11, 13, 10),
      end_time: Time.new(2018, 11, 13, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Lucas\n- __Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Macho",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Katherine Cordova',
      start_time: Time.new(2018, 11, 13, 11),
      end_time: Time.new(2018, 11, 13, 11) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Chispa\n- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Hembra",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Luz Maria Garcia',
      client_phone: '2937062',
      start_time: Time.new(2018, 11, 14, 9),
      end_time: Time.new(2018, 11, 14, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Toto\n- __Especie__: Canina\n- __Sexo__: Macho\n- __Color__: Cafe",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Lcdo Jaramillo',
      client_phone: '0986086541',
      start_time: Time.new(2018, 11, 14, 10),
      end_time: Time.new(2018, 11, 14, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Doofi\n- __Especie__: Canina\n- __Sexo__: Macho",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Jose Flores',
      client_phone: '0980678160',
      start_time: Time.new(2018, 11, 14, 11),
      end_time: Time.new(2018, 11, 14, 11) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Especie__: Canina\n- __Sexo__: Hembra",
    },

    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Raul Toala',
      client_phone: '0987257524',
      start_time: Time.new(2018, 11, 15, 9),
      end_time: Time.new(2018, 11, 15, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Junior\n- __Especie__: Canina\n- __Raza__: Bulldog f\n- __Sexo__: Macho",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Denis Luna',
      client_phone: '0996602480',
      start_time: Time.new(2018, 11, 15, 10),
      end_time: Time.new(2018, 11, 15, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Mandi\n- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Hembra",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Lcdo Jaramillo',
      client_phone: '2937384',
      start_time: Time.new(2018, 11, 15, 11),
      end_time: Time.new(2018, 11, 15, 11) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Harrison",
    },

    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Martha Villamicancia',
      client_phone: '0939973426',
      start_time: Time.new(2018, 11, 16, 9),
      end_time: Time.new(2018, 11, 16, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Toby\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Nicol Lamas',
      client_phone: '0987765457',
      start_time: Time.new(2018, 11, 16, 10),
      end_time: Time.new(2018, 11, 16, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Bingo\n- __Especie__: Canina\n- __Raza__: Snauzer\n- __Sexo__: Macho\n- __Color__: Gris",
    },

    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Maritza Villamar',
      client_phone: '0988664492',
      start_time: Time.new(2018, 11, 17, 9),
      end_time: Time.new(2018, 11, 17, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Perlita\n- __Especie__: Canina\n- __Sexo__: Hembra\n- __Color__: Negro",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Mari Moran',
      client_phone: '0996963309',
      start_time: Time.new(2018, 11, 17, 10),
      end_time: Time.new(2018, 11, 17, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Oliva\n- __Especie__: Canina\n- __Raza__: Snauzer\n- __Sexo__: Macho\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Andres Medina',
      client_phone: '0999478538',
      start_time: Time.new(2018, 11, 17, 11),
      end_time: Time.new(2018, 11, 17, 11) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Lola\n- __Especie__: Canina\n- __Raza__: Bull Terry\n- __Sexo__: Hembra\n- __Color__: Tricolor",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Nathaly Marallo',
      client_phone: '0999581763',
      start_time: Time.new(2018, 11, 17, 12),
      end_time: Time.new(2018, 11, 17, 12) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Sparki\n- __Especie__: Canina\n- __Raza__: Yorkie\n- __Color__: Tricolor",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Alexis Silva',
      client_phone: '0980847076',
      start_time: Time.new(2018, 11, 17, 13),
      end_time: Time.new(2018, 11, 17, 13) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Rosco\n- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Macho\n- __Color__: Negro",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Maylin Martinez',
      client_phone: '0986621275',
      start_time: Time.new(2018, 11, 17, 14),
      end_time: Time.new(2018, 11, 17, 14) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Nena\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra\n- __Color__: Blanco",
    },

    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Christian Román',
      client_phone: '0991141239',
      start_time: Time.new(2018, 11, 19, 9),
      end_time: Time.new(2018, 11, 19, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Odo\n- __Especie__: Canina\n- __Raza__: Yorkie\n- __Color__: Crema",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Sra de Román',
      client_phone: '2935593',
      start_time: Time.new(2018, 11, 19, 10),
      end_time: Time.new(2018, 11, 19, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Candy\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra\n- __Color__: Caramelo",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Marcelo Balcazar',
      client_phone: '0991042028',
      start_time: Time.new(2018, 11, 19, 11),
      end_time: Time.new(2018, 11, 19, 11) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Peluchin\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco",
    },

    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Alexandra Ramirez',
      client_phone: '0994449111',
      start_time: Time.new(2018, 11, 20, 9),
      end_time: Time.new(2018, 11, 20, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Bigote\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Andrea Garzon',
      client_phone: '0984808961',
      start_time: Time.new(2018, 11, 20, 10),
      end_time: Time.new(2018, 11, 20, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Teo\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Lidia Quimiz',
      # client_phone: '0984808961',
      start_time: Time.new(2018, 11, 21, 9),
      end_time: Time.new(2018, 11, 21, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Hahey\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Robert Anchundia',
      client_phone: '0969375383',
      start_time: Time.new(2018, 11, 22, 9),
      end_time: Time.new(2018, 11, 22, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Bambi\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Gabriela Sanchez',
      client_phone: '0992652080',
      start_time: Time.new(2018, 11, 23, 9),
      end_time: Time.new(2018, 11, 23, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Sniker\n- __Especie__: Canina\n- __Raza__: Scottish\n- __Sexo__: Macho\n- __Color__: Negro",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Roxana Ayala',
      client_phone: '0939256474',
      start_time: Time.new(2018, 11, 23, 10),
      end_time: Time.new(2018, 11, 23, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Posho\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Ma. Fernanda Bohorquez',
      client_phone: '0986951123',
      start_time: Time.new(2018, 11, 23, 11),
      end_time: Time.new(2018, 11, 23, 11) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Mila\n- __Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Hembra",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Ronal Suarez',
      client_phone: '0985572466',
      start_time: Time.new(2018, 11, 24, 9),
      end_time: Time.new(2018, 11, 24, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Valentina\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Maria Fernanda Flores',
      client_phone: '0992052569',
      start_time: Time.new(2018, 11, 24, 10),
      end_time: Time.new(2018, 11, 24, 10) + (peluqueria_normal.duration_min).minutes,
      # remark: "- __Mascota__: Valentina\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Johana Lopez',
      client_phone: '0985708122',
      start_time: Time.new(2018, 11, 24, 12),
      end_time: Time.new(2018, 11, 24, 12) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Chester\n- __Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Macho",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Ma. Eugenia Lopez',
      client_phone: '0998079811',
      start_time: Time.new(2018, 11, 24, 13),
      end_time: Time.new(2018, 11, 24, 13) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Estrella y Poli\n- __Especie__: Canina\n- __Sexo__: Hembra",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Sara Avesillas',
      # client_phone: '0998079811',
      start_time: Time.new(2018, 11, 26, 9),
      end_time: Time.new(2018, 11, 26, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Cotto\n- __Especie__: Canina\n- __Raza__: Mestiza\n- __Sexo__: Macho\n- __Color__: Gris",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Romina',
      client_phone: '0988764448',
      start_time: Time.new(2018, 11, 26, 10),
      end_time: Time.new(2018, 11, 26, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Loco\n- __Especie__: Canina\n- __Raza__: Ruffo",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Nancy',
      client_phone: '0999611465',
      start_time: Time.new(2018, 11, 27, 9),
      end_time: Time.new(2018, 11, 27, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Negro",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Juan Jimenez',
      client_phone: '2938927',
      start_time: Time.new(2018, 11, 27, 10),
      end_time: Time.new(2018, 11, 27, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Peluso\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Macho\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Maritza Rodriguez',
      client_phone: '0958806912',
      start_time: Time.new(2018, 11, 27, 11),
      end_time: Time.new(2018, 11, 27, 11) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Samy / Zimba\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Sra Solari',
      client_phone: '0993516397',
      start_time: Time.new(2018, 11, 28, 9),
      end_time: Time.new(2018, 11, 28, 9) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Portos\n- __Especie__: Canina\n- __Sexo__: Macho",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Juan Espinoza',
      client_phone: '0979030098',
      start_time: Time.new(2018, 11, 28, 10),
      end_time: Time.new(2018, 11, 28, 10) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Muñeca\n- __Especie__: Canina\n- __Raza__: French\n- __Sexo__: Hembra\n- __Color__: Blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Pilar Canales',
      client_phone: '2938261',
      start_time: Time.new(2018, 11, 29, 9),
      end_time: Time.new(2018, 11, 29, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Nano\n- __Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Macho\n- __Color__: Cafe con blanco",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Melida Coronel',
      client_phone: '0993964553',
      start_time: Time.new(2018, 11, 29, 10),
      end_time: Time.new(2018, 11, 29, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "- __Mascota__: Preciosa\n- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Hembra\n- __Color__: Gris",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Juan Jose Alava',
      client_phone: '0969014978',
      start_time: Time.new(2018, 11, 30, 9),
      end_time: Time.new(2018, 11, 30, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Macho",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_medicado.id,
      client_name: 'Gina Moran',
      client_phone: '0997115647',
      start_time: Time.new(2018, 11, 30, 9),
      end_time: Time.new(2018, 11, 30, 9) + (peluqueria_medicado.duration_min).minutes,
      remark: "- __Mascota__: Maggy\n- __Especie__: Canina\n- __Raza__: Schnauzer\n- __Sexo__: Hembra\n- __Color__: Gris",
    },
    {
      specialist_id: mafer.id,
      service_id: peluqueria_normal.id,
      client_name: 'Dra Ariana',
      # client_phone: '0997115647',
      start_time: Time.new(2018, 11, 30, 10),
      end_time: Time.new(2018, 11, 30, 10) + (peluqueria_normal.duration_min).minutes,
      remark: "__Especie__: Canina\n- __Raza__: Shitzu\n- __Sexo__: Hembra",
    },
  ]

  Appointment.create(appointments)

end