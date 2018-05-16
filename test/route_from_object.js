import 'babel-polyfill'
import assert from 'assert'

import Route from '../src/http'
import { methods, defaults, } from '../src/http/configs'

describe('Route from object', () => {
  const name = 'api'
  const address = 'http://localhost:3000/'
  const signInUrl = 'http://localhost:3000/signInAccount'
  const api = new Route({
    name,
    address,
    routes: {
      signIn: '/signInAccount',
    },
  })
  describe('checking signIn route options after creating it', () => {
    it('name should be signIn', () => {
      assert.equal(api.signIn.getName(), 'signIn')
    })
    it('signIn must be instanceof Route', () => {
      assert.equal((api.signIn instanceof Route), true)
    })
    it('signIn url must be value of signInUrl varibale', () => {
      assert.equal(api.signIn.getUrl(), signInUrl)
    })
  })
  describe('checking signIn route options after api route change (signIn options should be changed)', () => {
    const newTimeout = 99999
    const newAddress = 'http://localhost:7777'
    const newMethod = methods.PUT
    const newMessages = { 404: 'Not found', }
    const newHeaders = { header: 'hello', }
    it('timeout should be changed', () => {
      api.setTimeout(newTimeout)
      assert.equal(api.signIn.getTimeout(), newTimeout)
    })
    it('address should be changed', () => {
      api.setAddress(newAddress)
      assert.equal(api.signIn.getAddress(), newAddress)
    })
    it('method should be changed', () => {
      api.setMethod(newMethod)
      assert.equal(api.signIn.getMethod(), newMethod)
    })
    it('messages should be changed', () => {
      api.setMessages(newMessages)
      assert.equal(api.signIn.getMessages(), newMessages)
    })
    it('headers should be changed', () => {
      api.setHeaders(newHeaders)
      assert.equal(api.signIn.getHeaders(), newHeaders)
    })
  })
})

describe('check api and signIn params functionality for rest apis', () => {
  const name = 'rest-api'
  const address = 'http://localhost:99999/'
  const restApi = new Route({
    name,
    address,
    routes: {
      signIn: '/signInAccount',
    },
  })
  it('getUrl should return fullPath, test 1', () => {
    const fullPath = 'http://localhost:99999/99/tt/signInAccount/77'
    const fullPathFromSdk = restApi.params(99, 'tt').signIn.params(77).getUrl()
    assert.equal(fullPathFromSdk, fullPath)
  })
  it('getUrl should return fullPath, test 2', () => {
    const fullPath = 'http://localhost:99999/signInAccount/11'
    const fullPathFromSdk = restApi.signIn.params(11).getUrl()
    assert.equal(fullPathFromSdk, fullPath)
  })
  it('getUrl should return urlWithoutParams, test 3', () => {
    const urlWithoutParams = 'http://localhost:99999/signInAccount'
    const timeout = defaults.timeout

    const signInTimeout = restApi.signIn.params(11).getTimeout()
    assert.equal(signInTimeout, timeout)
    restApi.signIn.fetch()
    const url = restApi.signIn.getUrl()
    assert.equal(url, urlWithoutParams)
  })
})
