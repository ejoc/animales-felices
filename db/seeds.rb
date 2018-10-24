service1 = Service.create({
  name: 'Cita General',
  price: 10,
  duration_min: 15,
})

service2 = Service.create({
  name: 'Corte de pelo',
  price: 10,
  duration_min: 60,
})

specialist1 = Specialist.create({
  name: 'Especialista 1',
  address: 'Direccion 1',
  phone: '09888888',
  # gender: 'male'
})
specialist2 = Specialist.create({
  name: 'Especialista 2',
  address: 'Direccion 2',
  phone: '22222222222',
  # gender: 'female'
})

SpecialistService.create({
  specialist: specialist1,
  service: service1
})

SpecialistService.create({
  specialist: specialist2,
  service: service2
})

# unit_type = UnitType.create(name: 'Unidad')

# product_type = ProductCategory.create(name: 'Medicamentos')

# Product.create(name: 'Producto 1', unit_type: unit_type, price: 2.00, product_category: product_type)

# company = Company.create(bin: '112231', name: 'Empresa 1')
# Supplier.create(cedula: '09999999', company: company, company_role: 'Gerente')

# Client.create(name: 'Cliente1', email: 'email1', address: 'address1', phone: '050515', cedula: '0999999999')

# for test

# i = Invoice.new(client_id: 1, specialist_id: 1, details_attributes: [{item_id: 3, quantity: 2, price_unit: 2, price_total: 4}])