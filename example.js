import Http, { methods, } from 'sdk-builder/http'

const apiHttp = new Http({
  name: 'api',
  url: 'https://localhost:3000',
})
apiHttp.setTimeout(5000)
apiHttp.setErrorMessages({
  400: 'Bad request, please don\'t repeat this request again',
  401: 'You need to authorize at first',
  403: 'You have not permission for this action',
  404: 'Nothing found, please check filled data',
  default: 'Sorry, error happans, please try again',
  timeout: 'Looks like the server is taking to long to respond, please try again in sometime',
})
apiHttp.enableLogs()

apiHttp.addRoute({
  name: 'user',
  path: '/user',
})

apiHttp.user.addRoute({
  name: 'get',
  path: '/',
  method: methods.GET,
})
apiHttp.user.addRoute({
  name: 'delete',
  path: '/',
  method: methods.DELETE,
})

const { api, } = apiHttp
async function action() {
  await api.user.get({}) // GET:: /user/
  await api.user.delete({}) // DELETE:: /user/
}
action()
