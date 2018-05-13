import 'babel-polyfill'
import assert from 'assert'

import { queryParams, } from '../src/http/helpers'

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
})
