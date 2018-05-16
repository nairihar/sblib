import 'babel-polyfill'
import assert from 'assert'

import Route from '../src/http'
import { methods, } from '../src/http/configs'

describe('check api tree params functionality for rest apis', () => {
  const name = 'rest-api'
  const address = 'http://localhost:666'
  const api = new Route({
    name,
    address,
    routes: {
      user: {
        [Route.main]: '/user',
        week: {
          method: methods.GET,
          path: '/week',
        },
        top: '/top',
      },
      auth: {
        [Route.main]: '/auth',
        signIn: '/signIn',
        signUp: '/signup',
      },
    },
  })
  const userAddress = 'http://localhost:666/user'
  const userJustAddress = 'http://localhost:666'
  const signInAddress = 'http://localhost:666/auth/signIn'
  const userWeekAddress = 'http://localhost:666/user/week'
  it('user route address should be value of userAddress variable', () => {
    assert.equal(api.user.getUrl(), userAddress)
  })
  it('signin route address should be value of signInAddress variable', () => {
    assert.equal(api.auth.signIn.getUrl(), signInAddress)
  })
  it('user.week route address should be value of userWeekAddress variable', () => {
    assert.equal(api.user.week.getUrl(), userWeekAddress)
  })
  it('address of user.week route address should be value of userJustAddress variable', () => {
    assert.equal(api.user.week.getAddress(), userJustAddress)
  })
})
