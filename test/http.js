import assert from 'assert'

import { Http } from '../src'

describe('Http layer, check gateway and route add get methods', () => {
  const testHttpOptions = {
    host: '127.0.0.1',
    port: 8080,
    timeout: 3000
  }

  describe('Check http Gateway get methods which returns empty data', () => {
    const testHttpEmty = new Http(testHttpOptions)
    it('should return empty gateways, getAllGatewayNames', () => {
      const allGatewayNamesLength = testHttpEmty.getAllGatewayNames().length
      assert.equal(allGatewayNamesLength, 0)
    })

    it('should return empty gateways, getAllGateways', () => {
      const allGatewayLength = Object.keys(testHttpEmty.getAllGateways()).length
      assert.equal(allGatewayLength, 0)
    })

    it('should return empty gateway, getGateway', () => {
      const testGateway = testHttpEmty.getGateway('empty')
      assert.equal(testGateway, null)
    })
  })

  describe('Check http Gateway add and get methods', () => {
    const testHttp = new Http(testHttpOptions)
    const gatewayOption = {
      name: 'user',
      path: '/user'
    }
    const newGateway = testHttp.addGateway(gatewayOption)

    it('should return gateway info', () => {
      const { name, path } = newGateway.getInfo()
      assert.equal(name, gatewayOption.name)
      assert.equal(path, gatewayOption.path)
    })

    it('should return gateway name', () => {
      const name = newGateway.getName()
      assert.equal(name, gatewayOption.name)
    })

    it('should return gateway path', () => {
      const path = newGateway.getPath()
      assert.equal(path, gatewayOption.path)
    })
  })
})
