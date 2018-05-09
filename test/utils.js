import 'babel-polyfill'
import assert from 'assert'

import { isRequestMethod, isNotEmptyString, } from '../src/http/helpers'
import { methods, } from '../src/http/configs'

describe('Utils methods', () => {
  describe('Check isRequestMethod', () => {
    it('should return true when the value is request method type', () => {
      assert.equal(isRequestMethod(methods.GET), true)
      assert.equal(isRequestMethod(methods.POST), true)
      assert.equal(isRequestMethod(methods.PUT), true)
      assert.equal(isRequestMethod(methods.DELETE), true)
    })
    it('should return false when the value is not request method type', () => {
      assert.equal(isRequestMethod('text'), false)
      assert.equal(isRequestMethod(undefined), false)
    })
  })

  describe('Check isNotEmptyString', () => {
    it('should return true when the value is not empty string', () => {
      assert.equal(isNotEmptyString('text'), true)
      assert.equal(isNotEmptyString('text text'), true)
    })
    it('should return false when the value is empty and wrogn type', () => {
      assert.equal(isNotEmptyString(undefined), false)
      assert.equal(isNotEmptyString(null), false)
      assert.equal(isNotEmptyString(21), false)
      assert.equal(isNotEmptyString(''), false)
      assert.equal(isNotEmptyString('    '), false)
    })
  })
})
