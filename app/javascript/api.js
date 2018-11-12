import axios from 'axios'
import moment from 'moment'
import { getFetchInit, objectToQueryString } from './utils/utils'

export function bookingAppointment(fields, ok, error) {
  // return axios(getFetchInit(
  //   '/appointments',
  //   'post',
  //   { appointment: fields },
  // ))

  axios(getFetchInit('/appointments', 'post', { appointment: fields }))
    .then(
      ({ data }) => {
        const response = data.data
        const event = {
          id: response.id,
          ...response.attributes,
          startTime: new Date(response.attributes.startTime),
          endTime: new Date(response.attributes.endTime),
        }
        ok(event)
      },
      err => error(err),
    )
}

let currentDate

export function getAppointments(date, ok, error) {
  currentDate = date
  // return axios(`/appointments/${date}`)
  axios(`/appointments/${date}`)
    .then(({ data }) => {
      if (currentDate === date) {
        const events = data
          .map(event => ({
            id: event.id,
            ...event.attributes,
            // resourceId: event.resource_id,
            startTime: new Date(event.attributes.startTime),
            endTime: new Date(event.attributes.endTime),
          }))

        ok(events)
      }
    })
    .catch(err => error(err))
}

let currentAppointmentId
export function getAppointment(id, ok, error) {
  // return axios(`/appointments/${id}`)
  currentAppointmentId = id
  axios(`/appointments/${id}`)
    .then(
      ({ data }) => {
        if (currentAppointmentId === id) {
          ok(data.data)
        }
      },
      err => error(err),
    )
}

export function getSpecialistsByService() {
  return axios('/appointments/specialists_by_service')
}

export function updateAppointment(id, fields, ok, error) {
  axios(getFetchInit(`/appointments/${id}`, 'PATCH', { appointment: fields }))
    .then(
      ({ data }) => {
        const response = data.data
        const event = {
          id: response.id,
          ...response.attributes,
          startTime: new Date(response.attributes.startTime),
          endTime: new Date(response.attributes.endTime),
        }
        ok(event)
      },
      err => error(err),
    )
}

export function cancelAppointment(id) {
  return axios(getFetchInit(`/appointments/${id}/cancel`, 'delete'))
}

export function bussySlotsSpecialist(id, service, date, ok, error) {
  axios(`/specialists/${id}/bussy_slots?date=${date}&service_id=${service}`)
    .then(
      ({ data }) => {
        const response = data.map((r) => {
          const slot = new Date(r.slot)
          const time = moment(slot)
          const hour = Number(time.format('H'))
          const minute = Number(time.format('mm'))
          return {
            slot,
            bussy: r.bussy,
            hour,
            minute,
          }
        })
        ok(response)
      },
      err => error(err),
    )
}

// Modulo de facturacion

export function invoiceCheckIn(fields, ok, error) {
  axios(getFetchInit('/invoices', 'post', { invoice: fields }))
    .then(
      ({ data }) => ok(data),
      err => error(err),
    )
}

export function registerIncomeProducts(fields, ok, error) {
  axios(getFetchInit('/income_products', 'post', { income_product: fields }))
    .then(
      ({ data }) => ok(data),
      err => error(err),
    )
}

export function getProducts(searchTerm, ok, error) {
  const obj = {
    search: searchTerm,
    // page,
  }
  const querystring = objectToQueryString(obj)

  axios.get(`/products?${querystring}`).then(
    ({ data }) => {
      const products = data.data.map(product => ({ ...product.attributes }))
      ok(products)
    },
    err => error(err),
  )
}

export function getServices(searchTerm, ok, error) {
  const obj = {
    search: searchTerm,
    // page,
  }
  const querystring = objectToQueryString(obj)

  axios.get(`/services?${querystring}`).then(
    ({ data }) => {
      console.log(data)
      // const services = data.data.map(service => ({ ...service.attributes }))
      ok(data)
    },
    err => error(err),
  )
}

export function getItems(searchTerm, ok, error) {
  const obj = {
    search: searchTerm,
    // page,
  }
  const querystring = objectToQueryString(obj)

  axios.get(`/items?${querystring}`).then(
    ({ data }) => {
      const items = data.data.map(item => ({ ...item.attributes }))
      ok(items)
    },
    err => error(err),
  )
}

export function getStockProducts(searchTerm, ok, error) {
  const obj = {
    search: searchTerm,
  }
  const querystring = objectToQueryString(obj)

  axios.get(`/stock_products?${querystring}`).then(
    ({ data }) => {
      const products = data.data.map(product => ({ ...product.attributes }))
      ok(products)
    },
    err => error(err),
  )
}

export function getClients(searchTerm, ok, error) {
  const obj = {
    search: searchTerm,
    // page,
  }
  const querystring = objectToQueryString(obj)

  axios.get(`/clients?${querystring}`).then(
    ({ data }) => ok(data),
    err => error(err),
  )
}

export function getSuppliers(searchTerm, ok, error) {
  const obj = {
    search: searchTerm,
  }
  const querystring = objectToQueryString(obj)

  axios.get(`/suppliers?${querystring}`).then(
    ({ data }) => ok(data),
    err => error(err),
  )
}

export function getSupplierByCode(cedula) {
  return axios.get(`/suppliers/${cedula}`)
}

export function getClientByCode(cedula) {
  return axios.get(`/clients/${cedula}`)
}


// Reports module

export function getReports(periodicity, ok, error) {
  axios.get(`/appointments/reports?periodicity=${periodicity}`)
    .then(
      ({ data }) => ok(data),
      err => error(err)
    )
}


// Account Module
export function updatePassword(params = {}) {
  return axios(getFetchInit(
    '/account/update_password',
    'PATCH',
    { user: params },
  ))
}

export function updateEmail(email) {
  return axios(getFetchInit(
    '/account/update_email',
    'PATCH',
    { user: { email } },
  ))
}


export default {
  getSuppliers,
  getClients,
  getStockProducts,
  getProducts,
  getServices,
}

// export function getSupplierById(id, ok, error) {
//   axios.get(`suppliers?cedula=${id}`).then(
//     ({ data }) => ok(data),
//     err => error(err),
//   )
// }
