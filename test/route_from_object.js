import 'babel-polyfill'
import assert from 'assert'

import Route from '../src/http'

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
})
