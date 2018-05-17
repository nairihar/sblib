import { parseOptions, parseResponse, } from './fetch'
import { defaults, } from '../configs'

const timeouts = []
let count = 0

export const fetchAsync = (options, { timeout, messages, }) => {
  const _count = count
  count += 1
  const calls = Promise.race([
    request(options, messages),
    requestTimeout(_count, timeout, messages),
  ])
  return calls
}

export const request = async (options, messages) => {
  let response = null
  const { requestOptions, url, } = parseOptions(options)

  try {
    response = await fetch(url, requestOptions)
    clearTimeout(timeouts[count])
  } catch (err) {
    throw new Error(messages.def || err.message)
  }

  try {
    const res = await parseResponse(response)
    return res.data
  } catch (err) {
    throw new Error(err.message)
  }
}

export const requestTimeout = (count, timeout, messages) => {
  return new Promise((resolve, reject) => {
    timeouts[count] = setTimeout(() => {
      clearTimeout(timeouts[count])
      reject(new Error(messages.timeout || defaults.messages.timeout))
    }, timeout)
  })
}
