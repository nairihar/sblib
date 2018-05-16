import 'babel-polyfill'
import assert from 'assert'

import Route from '../src/http'
import { defaults, methods, } from '../src/http/configs'

describe('Route root route info after set data', () => {
  describe('checking values for setting data', () => {
    const name = 'api'
    const address = 'http://localhost:3000'
    const newAddress = 'http://localhost:3001'
    const timeout = 7999
    const method = methods.DELETE
    const url = `${newAddress}${defaults.path}`
    const messages = {
      500: 'Bad Request!!',
    }
    const headers = {
      test: 'test',
    }
    const api = new Route({
      address,
      name,
      routes: {},
    })
    api.setTimeout(timeout)
    api.setAddress(newAddress)
    api.setMethod(method)
    api.setMessages(messages)
    api.setHeaders(headers)
    it('getAddress should return value of address variable', () => {
      assert.equal(api.getAddress(), newAddress)
    })
    it('getUrl should return value of url variable', () => {
      assert.equal(api.getUrl(), url)
    })
    it('getUrl should return "/"', () => {
      assert.equal(api.getPath(), defaults.path)
    })
    it('getTimeout should return value of timeout variable', () => {
      assert.equal(api.getTimeout(), timeout)
    })
    it('getMethod should return value of method variable', () => {
      assert.equal(api.getMethod(), method)
    })
    it('getMessages should return value of messages object', () => {
      assert.deepEqual(api.getMessages(), messages)
    })
    it('getHeaders should return value of headers object', () => {
      assert.deepEqual(api.getHeaders(), headers)
    })
    it('getInfo should return all info', () => {
      const info = {
        name: 'api',
        address: newAddress,
        path: defaults.path,
        method,
        timeout,
        url: newAddress,
        messages,
        headers,
      }
      assert.deepEqual(api.getInfo(), info)
    })
  })
})
