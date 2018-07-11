# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Service.create([
  {
    name: 'Cita General',
    price: 10,
    duration_min: 15,
  },
  {
    name: 'Corte de pelo',
    price: 10,
    duration_min: 60,
  }
])

Specialist.create([
  {
    name: 'Especialista 1',
    address: 'Direccion 1',
    phone: '09888888',
    gender: 'male'
  },
  {
    name: 'Especialista 2',
    address: 'Direccion 2',
    phone: '22222222222',
    gender: 'female'
  }
])