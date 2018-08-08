import axios from 'axios'
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

export function bookingAppointment(fields) {
  return axios(getFetchInit(
    '/appointments',
    'post',
    { appointment: fields },
  ))
}

export function getAppointments(date) {
  return axios(`/appointments/${date}`)
}

export function getAppointment(id) {
  return axios(`/appointments/${id}`)
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

// export async function getAppointment(id, error) {
//   try {
//     const response = await axios(`/appointments/${id}`)
//     return response.data
//   } catch (err) {
//     console.log(error)
//     return error(err)
//   }
// }
