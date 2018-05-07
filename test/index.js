import assert from 'assert'

import BSDK from '../src'

describe('Create sdk', () => {
  const sdkOptions = {
    name: 'Test SDK',
    version: 'v1.0'
  }
  const sdk = new BSDK(sdkOptions)

  describe('Check get Methods', () => {
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
})
