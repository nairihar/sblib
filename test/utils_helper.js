import 'babel-polyfill'
import assert from 'assert'

import { isRequestMethod, isNotEmptyString, isObject, removeLastSlashSymbol, isSymbol, isARoute, } from '../src/http/helpers'
import { methods, defaults, } from '../src/http/configs'

describe('Utils methods', () => {
  describe('check isRequestMethod', () => {
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

  describe('Check isObject', () => {
    it('should return true when the value is object', () => {
      assert.equal(isObject({}), true)
    })
    it('should return false when the value is not object', () => {
      assert.equal(isObject(undefined), false)
      assert.equal(isObject(null), false)
      assert.equal(isObject(21), false)
      assert.equal(isObject(''), false)
    })
  })

  describe('Check removeLastSlashSymbol', () => {
    it('should return one sliced string and one not sliced', () => {
      assert.equal(removeLastSlashSymbol('text/'), 'text')
      assert.equal(removeLastSlashSymbol('text'), 'text')
    })
  })

  describe('Check isSymbol', () => {
    it('should return true because valie is symbol', () => {
      assert.equal(isSymbol(methods.GET), true)
      assert.equal(isSymbol(Symbol('adasd')), true)
    })
    it('should return false because valie is not symbol', () => {
      assert.equal(isSymbol(3213), false)
      assert.equal(isSymbol('asdsad'), false)
    })
  })

  describe('Check isARoute', () => {
    it('should return true because obj is route', () => {
      assert.equal(isARoute({
        path: '/dsd',
        method: methods.GET,
      }), true)
    })
    it('should return false because obj is not route', () => {
      assert.equal(isARoute({}), false)
      assert.equal(isARoute({
        path: '/dsd',
      }), false)
      assert.equal(isARoute({
        path: '/dsd',
        method: 'defaults',
      }), false)
      assert.equal(isARoute({
        method: methods.GET,
      }), false)
    })
  })
})
