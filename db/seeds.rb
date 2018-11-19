require 'ffaker'
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
  name: FFaker::Name.name,
  address: FFaker::Address.street_address,
  phone: FFaker::PhoneNumber.short_phone_number,
  # gender: 'male'
})
specialist2 = Specialist.create({
  name: FFaker::Name.name,
  address: FFaker::Address.street_address,
  phone: FFaker::PhoneNumber.short_phone_number,
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

unit_type = UnitType.create(name: 'Unidad')

product_type = ProductCategory.create(name: 'Medicamentos')

# marca = Brand.create(name: 'Artroflex')

Product.create(
  name: 'Pildoras para las garrapatas',
  unit_type: unit_type,
  price: 2.00,
  product_category: product_type,
  brand: FFaker::Product.brand,
)

5.times do
  Product.create(
    name: FFaker::Product.product_name,
    unit_type: unit_type,
    price: 2.00,
    product_category: product_type,
    brand: FFaker::Product.brand,
  )
end

company = Company.create(bin: FFaker::CompanyIT.partita_iva, name: FFaker::CompanyIT.name)

5.times {
  Supplier.create(
    cedula: rand(10 ** 10).to_s.rjust(10,'0'),
    name: FFaker::Name.name,
    email: FFaker::Internet.email,
    address: FFaker::Address.street_address,
    phone: FFaker::PhoneNumber.short_phone_number,
    company: company,
    company_role: 'Gerente'
  )
}

10.times do
  Client.create(
    name: FFaker::Name.name,
    email: FFaker::Internet.email,
    address: FFaker::Address.street_address,
    phone: FFaker::PhoneNumber.short_phone_number,
    cedula: rand(10 ** 10).to_s.rjust(10, '0')
  )
end

PaymentMethod.create(name: 'Efectivo')

# for test
# i = Invoice.new(client_id: 1, specialist_id: 1, details_attributes: [{item_id: 3, quantity: 2, price_unit: 2, price_total: 4}])

User.create(email: 'eliass_56@hotmail.com', password: 'eliass1771', specialist: specialist1)