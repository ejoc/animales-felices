def invoice_factory(client: ,items:, no:, date:)
  # mafer = Specialist.find_by(name: 'Maria Fernanada')

  ### Desde aqui empieza
  ## por cada factura copia y pega desde aqui

  ## Busca o crea el cliente por la cedula -> Solo ingresa la cedula y el nombre
  current_client = Client.find_or_create_by(cedula: client[:cedula]) do |c|
    # tiempo en que se genera la factura, solo cambia año, mes, dia
    c.name = client[:name] # Nombre del cliente
    c.created_at = date
    c.updated_at = date
  end

  ## Aqui solo cambia el numero de factura
  invoice = Invoice.new({
    no: no, ## aqui
    client_id: current_client.id,
    specialist_id: 1, ## mafer
    payment_method_id: 1, ## efectivo
    created_at: date,
    updated_at: date
  })

  ## Aqui solo cambia el nombre del producto y la cantidad
  invoice.details = items.map do |p|
    item = Item.find_by(name: p[:name])
    if item
      InvoiceDetail.new({
        item_id: item.id,
        quantity: p[:quantity],
        price_unit: item.price,
        price_total: item.price * p[:quantity],
      })
    else
      nil
    end
  end.reject{|i| i.nil? }

  puts no

  if invoice.details.size >= 1
    invoice.save!
  else
    puts "Empty details"
  end
end

task :seed_invoices => :environment do

  invoice_factory({
      no: "001-001-0001228",
      date: Time.new(2019, 2, 1, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Jose Mendoza",
        cedula: "0907096457"
      },
      items: [
        {
          name: "Shampoo keracleen", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })

  
  invoice_factory({
      no: "001-001-0001229",
      date: Time.new(2019, 2, 2, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Teresita Castro",
        cedula: "0903926616"
      },
      items: [
        {
          name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  # invoice_factory({
  #     no: "001-001-0001230",
  #     date: Time.new(2019, 2, 4, rand(8..18), rand(1..59), rand(1..59)),
  #     client: {
  #       name: "Ariana Fierro",
  #       cedula: ""
  #     },
  #     items: [
  #       {
  #         name: "Vacunas", ## Nombre del item (producto o servicio)
  #         quantity: 3, ## cantidad
  #       },
  #     ]
  #   })
  
  
  # invoice_factory({
  #     no: "001-001-0001231",
  #     date: Time.new(2019, 2, 4, rand(8..18), rand(1..59), rand(1..59)),
  #     client: {
  #       name: "Ariana Fierro",
  #       cedula: ""
  #     },
  #     items: [
  #       {
  #         name: "Vacunas", ## Nombre del item (producto o servicio)
  #         quantity: 5, ## cantidad
  #       },
  #       {
  #         name: "Rimadyl", ## Nombre del item (producto o servicio)
  #         quantity: 10, ## cantidad
  #       },
  #     ]
  #   })
  
  
  # invoice_factory({
  #     no: "001-001-0001232",
  #     date: Time.new(2019, 2, 6, rand(8..18), rand(1..59), rand(1..59)),
  #     client: {
  #       name: "Ariana Fierro",
  #       cedula: ""
  #     },
  #     items: [
  #       {
  #         name: "Vacunas", ## Nombre del item (producto o servicio)
  #         quantity: 3 ## cantidad
  #       },
  #     ]
  #   })
  
  
  invoice_factory({
      no: "001-001-0001234",
      date: Time.new(2019, 2, 8, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Tanya Del Salto Montero",
        cedula: "0917269292"
      },
      items: [
        {
          name: "Vacunas", ## Nombre del item (producto o servicio)
          quantity: 2, ## cantidad
        },
        {
          name: "Bonavit", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  # invoice_factory({
  #     no: "001-001-0001235",
  #     date: Time.new(2019, 2, 11, rand(8..18), rand(1..59), rand(1..59)),
  #     client: {
  #       name: "Paul Escobar",
  #       cedula: ""
  #     },
  #     items: [
  #       {
  #         name: "Servicio Meolico", ## Nombre del item (producto o servicio)
  #         quantity: 1, ## cantidad
  #       },
  #     ]
  #   })
  
  
  invoice_factory({
      no: "001-001-0001236",
      date: Time.new(2019, 2, 16, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Fabricio Alaña",
        cedula: "0909768822"
      },
      items: [
        {
          name: "Consulta", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
        {
          name: "Rimadyl", ## Nombre del item (producto o servicio)
          quantity: 3, ## cantidad
        },
      ]
    })
  
  
  invoice_factory({
      no: "001-001-0001237",
      date: Time.new(2019, 2, 18, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Patricia Vallejo",
        cedula: "0922220538"
      },
      items: [
        {
          name: "Vacunas", ## Nombre del item (producto o servicio)  
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  # invoice_factory({
  #     no: "001-001-0001239",
  #     date: Time.new(2019, 2, 25, rand(8..18), rand(1..59), rand(1..59)),
  #     client: {
  #       name: "Ariana Fierro",
  #       cedula: ""
  #     },
  #     items: [
  #       {
  #         name: "Vacunas", ## Nombre del item (producto o servicio)
  #         quantity: 6, ## cantidad
  #       },
  #       {
  #         name: "Shampoo keracleen", ## Nombre del item (producto o servicio)
  #         quantity: 1, ## cantidad
  #       },
  #     ]
  #   })
  
  invoice_factory({
      no: "001-001-0001240",
      date: Time.new(2019, 2, 25, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Pablo Maquilon",
        cedula: "0907549869"
      },
      items: [
        {
          name: "Consulta", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  invoice_factory({
      no: "001-001-0001241",
      date: Time.new(2019, 2, 16, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Maria Granda",
        cedula: "0914747621"
      },
      items: [
        {
          name: "Vacunas", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  invoice_factory({
      no: "001-001-0001242",
      date: Time.new(2019, 2, 16, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Patricia Montece",
        cedula: "0914686167"
      },
      items: [
        {
          name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  invoice_factory({
      no: "001-001-0001244",
      date: Time.new(2019, 3, 18, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Maria Granda",
        cedula: "0914747621"
      },
      items: [
        {
          name: "Vacunas", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  # invoice_factory({
  #     no: "001-001-0001245",
  #     date: Time.new(2019, 3, 21, rand(8..18), rand(1..59), rand(1..59)),
  #     client: {
  #       name: "Ariana Fierro",
  #       cedula: ""
  #     },
  #     items: [
  #       {
  #         name: "Vacunas", ## Nombre del item (producto o servicio)
  #         quantity: 2, ## cantidad
  #       },
  #     ]
  #   })
  
  invoice_factory({
      no: "001-001-0001246",
      date: Time.new(2019, 3, 23, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Maria del Mar Landivar",
        cedula: "0917203895"
      },
      items: [
        {
          name: "Vacunas", ## Nombre del item (producto o servicio)
          quantity: 4, ## cantidad
        },
      ]
    })
  
  
  invoice_factory({
      no: "001-001-0001247",
      date: Time.new(2019, 3, 23, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Magali Barona",
        cedula: "0915942510"
      },
      items: [
        {
          name: "Examen de sangre (completo)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })

    invoice_factory({
      no: "001-001-0001248",
      date: Time.new(2019, 3, 25, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Edda Lorena Gattavara Poblete",
        cedula: "0909032294"
      },
      items: [
        {
          name: "Vacunas", ## Nombre del item (producto o servicio)
          quantity: 2, ## cantidad
        },
      ]
    })
  

  invoice_factory({
      no: "001-001-0001249",
      date: Time.new(2019, 3, 26, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Mercedes Davila",
        cedula: "0909847550"
      },
      items: [
        {
          name: "Examen de sangre (completo)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  

  invoice_factory({
      no: "001-001-0001250",
      date: Time.new(2019, 3, 26, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Mercedes Davila",
        cedula: "0909847550"
      },
      items: [
        {
          name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  invoice_factory({
      no: "001-001-0001251",
      date: Time.new(2019, 3, 29, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Ivan Correa",
        cedula: "1712288610"
      },
      items: [
        {
          name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  # invoice_factory({
  #     no: "001-001-0001252",
  #     date: Time.new(2019, 4, 1, rand(8..18), rand(1..59), rand(1..59)),
  #     client: {
  #       name: "Ariana Fierro",
  #       cedula: ""
  #     },
  #     items: [
  #       {
  #         name: "Vacunas", ## Nombre del item (producto o servicio)
  #         quantity: 2, ## cantidad
  #       },
  #     ]
  #   })
  
  
  invoice_factory({
      no: "001-001-0001253",
      date: Time.new(2019, 4, 2, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Juan Merino",
        cedula: "0915163745"
      },
      items: [
        {
          name: "Examen de sangre (completo)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  
  
  
  invoice_factory({
      no: "001-001-0001254",
      date: Time.new(2019, 4, 3, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Monserate Calderon",
        cedula: "0904821493"
      },
      items: [
        {
          name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  

  invoice_factory({  
      no: "001-001-0001255",
      date: Time.new(2019, 4, 5, rand(8..18), rand(1..59), rand(1..59)),
      client: {
        name: "Maria Granda",
        cedula: "0914747621"
      },
      items: [
        {
          name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
          quantity: 1, ## cantidad
        },
      ]
    })
  

  invoice_factory({  
    no: "001-001-0001256",
    date: Time.new(2019, 4, 9, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Fernanda Armijos",
      cedula: "0705325704"
    },
    items: [
      {
        name: "Examen de sangre (completo)", ## Nombre del item (producto o servicio)
        quantity: 2, ## cantidad
      },
    ]
  })


  # invoice_factory({
  #   no: "001-001-0001258",
  #   date: Time.new(2019, 4, 12, rand(8..18), rand(1..59), rand(1..59)),
  #   client: {
  #     name: "Dr Cristian Bonilla",
  #     cedula: ""
  #   },
  #   items: [
  #     {
  #       name: "Shampoo keracleen", ## Nombre del item (producto o servicio)
  #       quantity: 1, ## cantidad
  #     },
  #   ]
  # })

  # invoice_factory({
  #   no: "001-001-0001259",
  #   date: Time.new(2019, 4, 23, rand(8..18), rand(1..59), rand(1..59)),
  #   client: {
  #     name: "Dra Ariana Fierro",
  #     cedula: ""
  #   },
  #   items: [
  #     {
  #       name: "Vacunas", ## Nombre del item (producto o servicio)
  #       quantity: 3, ## cantidad
  #     },
  #     {
  #       name: "Rimadyl", ## Nombre del item (producto o servicio)
  #       quantity: 5, ## cantidad
  #     },
  #   ]
  # })

  invoice_factory({
    no: "001-001-0001260",
    date: Time.new(2019, 4, 20, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Gustavo Vasconez",
      cedula: "0900334883"
    },
    items: [
      {
        name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
    ]
  })

  invoice_factory({
    no: "001-001-0001261",
    date: Time.new(2019, 4, 24, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Miguel Cruz",
      cedula: "0915705701"
    },
    items: [
      {
        name: "Peluquería (baño normal)", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
    ]
  })

  invoice_factory({
    no: "001-001-0001262",
    date: Time.new(2019, 4, 29, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Balpisa",
      cedula: "0992140461001"
    },
    items: [
      {
        name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
    ]
  })

  # invoice_factory({
  #   no: "001-001-0001263",
  #   date: Time.new(2019, 4, 29, rand(8..18), rand(1..59), rand(1..59)),
  #   client: {
  #     name: "Marta Fajardo",
  #     cedula: ""
  #   },
  #   items: [
  #     {
  #       name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
  #       quantity: 1, ## cantidad
  #     },
  #   ]
  # })


  # invoice_factory({
  #   no: "001-001-0001263",
  #   date: Time.new(2019, 4, 29, rand(8..18), rand(1..59), rand(1..59)),
  #   client: {
  #     name: "Marta Fajardo",
  #     cedula: ""
  #   },
  #   items: [
  #     {
  #       name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
  #       quantity: 1, ## cantidad
  #     },
  #   ]
  # })

  invoice_factory({
    no: "001-001-0001264",
    date: Time.new(2019, 5, 2, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Javier Urquizo",
      cedula: "0905017869"
    },
    items: [
      {
        name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
    ]
  })


  invoice_factory({
    no: "001-001-0001265",
    date: Time.new(2019, 5, 8, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Andrea Chavez",
      cedula: "0920250818"
    },
    items: [
      {
        name: "Consulta", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
    ]
  })

  invoice_factory({
    no: "001-001-0001266",
    date: Time.new(2019, 5, 13, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Guillermo Perez",
      cedula: "0900505777"
    },
    items: [
      {
        name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
    ]
  })

  # invoice_factory({
  #   no: "001-001-0001267",
  #   date: Time.new(2019, 5, 31, rand(8..18), rand(1..59), rand(1..59)),
  #   client: {
  #     name: "Daniel Parrales",
  #     cedula: ""
  #   },
  #   items: [
  #     {
  #       name: "Consulta", ## Nombre del item (producto o servicio)
  #       quantity: 1, ## cantidad
  #     },
  #     {
  #       name: "Esterilización perros (macho)", ## Nombre del item (producto o servicio)
  #       quantity: 1, ## cantidad
  #     },
  #   ]
  # })

  invoice_factory({
    no: "001-001-0001268",
    date: Time.new(2019, 5, 31, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Cristhian Acosta",
      cedula: "1205009796"
    },
    items: [
      {
        name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
    ]
  })

  invoice_factory({
    no: "001-001-0001269",
    date: Time.new(2019, 5, 31, rand(8..18), rand(1..59), rand(1..59)),
    client: {
      name: "Pedro Robles",
      cedula: "0912811049"
    },
    items: [
      {
        name: "Peluquería (baño medicado)", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
      {
        name: "Shampoo keracleen", ## Nombre del item (producto o servicio)
        quantity: 1, ## cantidad
      },
      {
        name: "Canisan f", ## Nombre del item (producto o servicio)
        quantity: 4, ## cantidad
      },
    ]
  })
  
end