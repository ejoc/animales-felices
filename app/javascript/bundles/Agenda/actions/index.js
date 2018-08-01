import { CALL_API, Schemas } from '../middleware/api'

export const SERVICES_REQUEST = 'SERVICES_REQUEST'
export const SERVICES_SUCCESS = 'SERVICES_SUCCESS'
export const SERVICES_FAILURE = 'SERVICES_FAILURE'

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchServices = () => ({
  // login,
  [CALL_API]: {
    types: [
      SERVICES_REQUEST,
      SERVICES_SUCCESS,
      SERVICES_FAILURE,
    ],
    endpoint: '/services',
    schema: Schemas.SERVICE_ARRAY,
  },
})


export const SPECIALISTS_REQUEST = 'SPECIALISTS_REQUEST'
export const SPECIALISTS_SUCCESS = 'SPECIALISTS_SUCCESS'
export const SPECIALISTS_FAILURE = 'SPECIALISTS_FAILURE'

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchSpecialists = () => ({
  // login,
  [CALL_API]: {
    types: [
      SPECIALISTS_REQUEST,
      SPECIALISTS_SUCCESS,
      SPECIALISTS_FAILURE,
    ],
    endpoint: '/specialists',
    schema: Schemas.SPECIALIST_ARRAY,
  },
})


export const APPOINTMENTS_REQUEST = 'APPOINTMENTS_REQUEST'
export const APPOINTMENTS_SUCCESS = 'APPOINTMENTS_SUCCESS'
export const APPOINTMENTS_FAILURE = 'APPOINTMENTS_FAILURE'

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchAppointments = (specialist, page) => ({
  specialist,
  page,
  [CALL_API]: {
    types: [
      APPOINTMENTS_REQUEST,
      APPOINTMENTS_SUCCESS,
      APPOINTMENTS_FAILURE,
    ],
    endpoint: `specialists/${specialist}/appointments/${page}`,
    schema: Schemas.APPOINTMENT_ARRAY,
  },
})

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
// export const loadAppointments = (specialist, page) => (dispatch, getState) => {
//   const {
//     nextPageUrl = `users/${login}/starred`,
//     pageCount = 0,
//   } = getState().pagination.appointments[page] || {}

//   if (pageCount > 0 && !nextPage) {
//     return null
//   }

//   return dispatch(fetchAppointments(specialist, page))
// }
