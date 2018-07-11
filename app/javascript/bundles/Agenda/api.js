import axios from 'axios'
import snakeCaseKeys from 'snakecase-keys'

function authenticityToken() {
  const token = document.querySelector('head meta[name="csrf-token"]');
  if (token && token instanceof window.HTMLMetaElement) {
    return token.content;
  }
  return null;
}

const getFetchInit = (url, requestMethod, body) => {
  const requestHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-CSRF-Token": authenticityToken(),
    "X-Requested-With": "XMLHttpRequest",
  }
  const fetchInit = {
    url: url,
    method: requestMethod,
    headers: requestHeaders,
    // credentials: 'same-origin',
  };

  if (body) {
    fetchInit.data = JSON.stringify(snakeCaseKeys(body))
  }

  return fetchInit;
};

export function getClients(searchParam) {
  return axios.get(`/clients?search${searchParam}`)
  // return response.data
}

export function bookingAppoiment(fields) {
  return axios(getFetchInit(
    '/booking_appoiment',
    'post',
    { appointment: fields }
  ))
}