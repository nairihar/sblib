import assert from 'assert'

import BSDK, { Http } from '../src'

describe('BSDK test', () => {
  const sdkOptions = {
    name: 'Test SDK',
    version: 'v1.0'
  }
  const sdk = new BSDK(sdkOptions)

  describe('Check SDK and check info methods', () => {
    it('should return all info about sdk', () => {
      const { name, version } = sdk.getInfo()
      assert.equal(name, sdkOptions.name)
      assert.equal(version, sdkOptions.version)
    })

    it('should return name from info', () => {
      const name = sdk.getName()
      assert.equal(name, sdkOptions.name)
    })

    it('should return version from info', () => {
      const version = sdk.getVersion()
      assert.equal(version, sdkOptions.version)
    })
  })

  describe('Create Http layer and check info methods', () => {
    const testHttpOptions = {
      host: '127.0.0.1',
      port: 8080,
      timeout: 3000
    }
    const testHttp = new Http(testHttpOptions)

    it('should return all info from http layer', () => {
      const { host, port, timeout } = testHttp.getInfo()
      assert.equal(host, testHttpOptions.host)
      assert.equal(port, testHttpOptions.port)
      assert.equal(timeout, testHttpOptions.timeout)
    })

    it('should return port from http info', () => {
      const host = testHttp.getHost()
      assert.equal(host, testHttpOptions.host)
    })

    it('should return port from http info', () => {
      const port = testHttp.getPort()
      assert.equal(port, testHttpOptions.port)
    })
  })
})
