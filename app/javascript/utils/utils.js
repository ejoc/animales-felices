

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

export const getFieldErrors = (errorsData, fieldValues) => {
  let fieldErrors
  if (errorsData instanceof Array) {
    fieldErrors = errorsData.map(error => {
      const fieldError = Object.keys(error)[0]
      return {
        [fieldError]: {
          value: fieldValues[fieldError],
          errors: error[fieldError].map(er => new Error(er)),
        },
      }
    })
  } else {
    const fieldError = Object.keys(errorsData)[0]
    fieldErrors = {
      [fieldError]: {
        value: fieldValues[fieldError],
        errors: errorsData[fieldError].map(er => new Error(er)),
      },
    }
  }
  return fieldErrors
}

export function pick(obj, keys) {
  return keys.map(k => k in obj ? {[k]: obj[k]} : {})
             .reduce((res, o) => Object.assign(res, o), {});
}

export function reject(obj, keys) {
  const vkeys = Object.keys(obj)
      .filter(k => !keys.includes(k));
  return pick(obj, vkeys);
}


export default {
  getFetchInit,
  objectToQueryString,
}
