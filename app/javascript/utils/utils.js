

function authenticityToken() {
  const token = document.querySelector('head meta[name="csrf-token"]')
  if (token && token instanceof window.HTMLMetaElement) {
    return token.content
  }
  return null
}

export const IVA = 0.12

export const getFetchInit = (url, requestMethod, body) => {
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
    fetchInit.data = JSON.stringify(body)
  }

  return fetchInit
}

export const objectToQueryString = (obj) => {
  const str = []
  Object.keys(obj).forEach((key) => {
    if (obj[key] && Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    }
  })

  return str.join('&')

  // for (var p in obj)
  //   if (obj.hasOwnProperty(p)) {
  //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
  //   }
  // return str.join('&')
}

export default {
  getFetchInit,
  objectToQueryString,
}
