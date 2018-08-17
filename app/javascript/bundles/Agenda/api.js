import axios from 'axios'
import moment from 'moment'
import snakeCaseKeys from 'snakecase-keys'

function authenticityToken() {
  const token = document.querySelector('head meta[name="csrf-token"]')
  if (token && token instanceof window.HTMLMetaElement) {
    return token.content
  }
  return null
}

const getFetchInit = (url, requestMethod, body) => {
  const requestHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-CSRF-Token": authenticityToken(),
    "X-Requested-With": "XMLHttpRequest",
  }
  const fetchInit = {
    url,
    method: requestMethod,
    headers: requestHeaders,
    // credentials: 'same-origin',
  }

  if (body) {
    fetchInit.data = JSON.stringify(snakeCaseKeys(body))
  }

  return fetchInit
}

export function getClients(searchParam) {
  return axios.get(`/clients?search=${searchParam}`)
  // return response.data
}

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

export function updateAppointment(id, fields) {
  return axios(getFetchInit(`/appointments/${id}`, 'PATCH', { appointment: fields }))
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

// export async function getAppointment(id, error) {
//   try {
//     const response = await axios(`/appointments/${id}`)
//     return response.data
//   } catch (err) {
//     console.log(error)
//     return error(err)
//   }
// }
