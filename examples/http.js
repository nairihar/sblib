// not working currently
import Route, { POST, GET, } from 'sdk-builder/http'

const routes = {
  default: '/',
  sigin: '/signin',
  signup: '/signup',
  user: {
    default: '/user',
    getAll: {
      default: '/all',
      getAll: POST,
      getById: GET,
    },
  },
}
const api = new Route({
  name: 'api',
  routes,
})

// default options
api.setHost('http://localhost:3000')
api.setTimeout(5000)
api.setErrorMessages({
  400: 'Bad request, please don\'t repeat this request again',
  401: 'You need to authorize at first',
  403: 'You have not permission for this action',
  404: 'Nothing found, please check filled data',
  default: 'Sorry, error happans, please try again',
  timeout: 'Looks like the server is taking to long to respond, please try again in sometime',
})
api.enableLogs()

async function action() {
  await api.user.get.fetch({}) // GET:: /user/
  await api.user.delete.fetch({}) // DELETE:: /user/
}
action()
