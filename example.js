import Http, { methods, } from 'sdk-builder/http'
import SDKBuilder from 'sdk-builder'

const authApi = new Http({
  name: 'auth',
  url: 'https://localhost:3000',
})

authApi.addRoute({
  path: '/signin',
  method: methods.POST,
})


const purchaseApi = new Http({
  name: 'purchase',
  url: 'https://localhost:8080',
})

const mobileGatewayOptions = {
  name: 'mobile',
  path: '/mobile',
}
purchaseApi.addGateway(mobileGatewayOptions)

const purchaseRouteOptions = {
  name: 'purchase',
  path: '/',
  method: methods.POST,
}
purchaseApi.mobile.addRoute(purchaseRouteOptions)

const sdk = new SDKBuilder({
  name: 'mySDK',
  version: 'v1.0',
})

sdk.addHttp(authApi, purchaseApi)

sdk.enableLogs()



