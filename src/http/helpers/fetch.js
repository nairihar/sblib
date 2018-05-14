import { methods, } from '../configs'

export const queryParams = (params = {}) => {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
  return query
}

/*
export const parseOptions = ({ method, headers, url, data, queryData, }) => {
  let parsedUrl = url
  let query, body

  if (method === methods.GET) {
    query = queryParams(queryData)
    parsedUrl += `?${query}`
  } else {
    body = JSON.stringify(data)
  }
  const options = {
    parsedUrl,
    requestOptions: {
      method,
      body,
      headers,
    },
  }
  return options
}

export const parseResponse = async (response) => {
  // TODO :: add error message handling and status codes
  const data = await response.json()
  return data
}
*/
