import { parseOptions, parseResponse, } from './fetch'

const timeouts = []
let count = 0

export default (options, { timeout, messages, }) => {
  const _count = count
  count += 1
  const calls = Promise.race([
    fetchAsync(options, messages),
    fetchTimeout(_count, timeout, messages),
  ])
  return calls
}


const fetchAsync = async (options, messages) => {
  let response = null
  const { requestOptions, url, } = parseOptions(options)

  try {
    response = await fetch(url, requestOptions)
    clearTimeout(timeouts[count])
  } catch (err) {
    throw new Error(messages.def)
  }

  try {
    const res = await parseResponse(response)
    return res.data
  } catch (err) {
    throw new Error(err.message)
  }
}

const fetchTimeout = (count, timeout, messages) => {
  return new Promise((resolve, reject) => {
    timeouts[count] = setTimeout(() => {
      clearTimeout(timeouts[count])
      reject(new Error(messages.timeout))
    }, timeout)
  })
}
