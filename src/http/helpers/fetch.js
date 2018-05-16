import { methods, } from '../configs'

export const queryParams = (params = {}) => {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
  return query
}

export const parseOptions = ({ method, headers, url, data, }) => {
  let myUrl = url
  let query, body

  if (method === methods.GET) {
    query = queryParams(data)
    myUrl += `?${query}`
  } else {
    body = JSON.stringify(data)
  }
  const options = {
    url: myUrl,
    requestOptions: {
      method,
      body,
      headers,
    },
  }
  return options
}
