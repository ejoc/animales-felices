# require 'ffaker'
# service1 = Service.create({
#   name: 'Cita General',
#   price: 10,
#   duration_min: 15,
# })

# service2 = Service.create({
#   name: 'Corte de pelo',
#   price: 10,
#   duration_min: 60,
# })

# specialist1 = Specialist.create({
#   name: FFaker::Name.name,
#   email: FFaker::Internet.email,
#   address: FFaker::Address.street_address,
#   phone: FFaker::PhoneNumber.short_phone_number,
#   # gender: 'male'
# })
# specialist2 = Specialist.create({
#   name: FFaker::Name.name,
#   email: FFaker::Internet.email,
#   address: FFaker::Address.street_address,
#   phone: FFaker::PhoneNumber.short_phone_number,
#   # gender: 'female'
# })

# SpecialistService.create({
#   specialist: specialist1,
#   service: service1
# })

# SpecialistService.create({
#   specialist: specialist2,
#   service: service2
# })


# Product.create(
#   name: 'Pildoras para las garrapatas',
#   unit_type: unit_type,
#   price: 2.00,
#   product_category: product_type,
#   brand: FFaker::Product.brand,
# )

# 5.times do
#   Product.create(
#     name: FFaker::Product.product_name,
#     unit_type: unit_type,
#     price: 2.00,
#     product_category: product_type,
#     brand: FFaker::Product.brand,
#   )
# end

# company = Company.create(bin: FFaker::CompanyIT.partita_iva, name: FFaker::CompanyIT.name)

# 5.times {
#   Supplier.create(
#     cedula: rand(10 ** 10).to_s.rjust(10,'0'),
#     name: FFaker::Name.name,
#     email: FFaker::Internet.email,
#     address: FFaker::Address.street_address,
#     phone: FFaker::PhoneNumber.short_phone_number,
#     company: company,
#     company_role: 'Gerente'
#   )
# }

# 10.times do
#   Client.create(
#     name: FFaker::Name.name,
#     email: FFaker::Internet.email,
#     address: FFaker::Address.street_address,
#     phone: FFaker::PhoneNumber.short_phone_number,
#     cedula: rand(10 ** 10).to_s.rjust(10, '0')
#   )
# end

# PaymentMethod.create(name: 'Efectivo')

# for test
# i = Invoice.new(client_id: 1, specialist_id: 1, details_attributes: [{item_id: 3, quantity: 2, price_unit: 2, price_total: 4}])

unidad = UnitType.create(name: 'Unidad')

medicamentos = ProductCategory.create(name: 'Medicamentos')
alimentos = ProductCategory.create(name: 'Alimentos')

Product.create([
  {
    name: 'Shampoo keracleen',
    brand: '',
    price: 12.00,
    unit_type: unidad,
    product_category: medicamentos,
  },
  {
    name: 'Bonavit',
    brand: '',
    price: 5.00,
    unit_type: unidad,
    product_category: medicamentos,
  },
  {
    name: 'Rimadyl',
    brand: '',
    price: 0.70,
    unit_type: unidad,
    product_category: medicamentos,
  },
  {
    name: 'Snack relajante',
    brand: '',
    price: 5.00,
    unit_type: unidad,
    product_category: alimentos,
  },
  {
    name: 'Canisan f',
    brand: '',
    price: 5.00,
    unit_type: unidad,
    product_category: medicamentos,
  },
])

Service.create([
  {
    name: 'Peliqueria (baño normal)',
    price: 15,
    duration_min: 60,
  },
  {
    name: 'Peliqueria (baño medicado)',
    price: 18,
    duration_min: 60,
  },
  {
    name: 'Limpieza dental',
    price: 50,
    duration_min: 10,
  },
  {
    name: 'Ecografía',
    price: 30,
    duration_min: 10,
  },
  {
    name: 'Consulta',
    price: 10,
    duration_min: 15,
  },
  {
    name: 'Vacunas',
    price: 15,
    duration_min: 10,
  },
  {
    name: 'Examen de sangre (completo)',
    price: 45,
    duration_min: 10,
  },
  {
    name: 'Examen de sangre (cani 4)',
    price: 60,
    duration_min: 60,
  },
  {
    name: 'Examen de sangre (hemograma)',
    price: 25,
    duration_min: 10,
  },
  {
    name: 'Examen de sangre (parvo corona)',
    price: 30,
    duration_min: 10,
  },
  {
    name: 'Leucemia y sida felino',
    price: 35,
    duration_min: 10,
  },
  {
    name: 'Esterilización gatos (nacho)',
    price: 40,
    duration_min: 10,
  },
  {
    name: 'Esterilización gatos (hembra)',
    price: 60,
    duration_min: 10,
  },
  {
    name: 'Esterilización perros (macho)',
    price: 80,
    duration_min: 10,
  },
  {
    name: 'Esterilización perros (hembra)',
    price: 100,
    duration_min: 10,
  },
])

# User.create(email: 'eliass_56@hotmail.com', password: 'animalesfelices', specialist: specialist1)