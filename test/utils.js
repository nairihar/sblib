import 'babel-polyfill'
import assert from 'assert'

import { isRequestMethod, } from '../src/http/helpers'
import { methods, } from '../src/http/configs'

describe('Utils methods', () => {
  describe('Check isRequestMethod', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(isRequestMethod(methods.GET), true)
      assert.equal(isRequestMethod(methods.POST), true)
      assert.equal(isRequestMethod(methods.PUT), true)
      assert.equal(isRequestMethod(methods.DELETE), true)
      assert.equal(isRequestMethod('text'), false)
      assert.equal(isRequestMethod(undefined), false)
    })
  })
})
