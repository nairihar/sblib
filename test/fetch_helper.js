import 'babel-polyfill'
import assert from 'assert'

import { queryParams, parseOptions, } from '../src/http/helpers'
import { methods, } from '../src/http/configs'

describe('Fetch helper methods', () => {
  describe('Check queryParams', () => {
    it('should return objects as query string', () => {
      assert.equal(queryParams({
        hello: 'hello',
        num: 1,
      }), 'hello=hello&num=1')
    })
    it('should return empty objects as empty query string', () => {
      assert.equal(queryParams({}), '')
    })
  })

  describe('Check parseOptions', () => {
    it('should return parsed options object for Get method', () => {
      const method = methods.GET
      const headers = {
        headedasdr: 1,
      }
      const options = {
        method,
        headers,
        url: 'http://localhost:4000',
        data: {
          d: 1,
          a: 2,
        },
      }
      const expectedRes = {
        url: 'http://localhost:4000?d=1&a=2',
        requestOptions: {
          method,
          headers,
          body: undefined,
        },
      }
      const res = parseOptions(options)
      assert.deepEqual(res, expectedRes)
    })
    it('should return parsed options object for PUT method', () => {
      const method = methods.PUT
      const headers = {
        headedasdr: 444,
      }
      const data = {
        d: 1090,
        a: 2,
      }
      const options = {
        method,
        headers,
        url: 'http://localhost:4000',
        data,
      }
      const expectedRes = {
        url: 'http://localhost:4000',
        requestOptions: {
          method,
          headers,
          body: JSON.stringify(data),
        },
      }
      const res = parseOptions(options)
      assert.deepEqual(res, expectedRes)
    })
  })
})
