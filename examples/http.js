// currently not working example
import Route, { GET, } from 'sdk-builder/http'

const routes = {
  default: '/',
  sigin: '/signin',
  signup: '/signup',
  user: {
    default: '/user',
    getById: GET,
  },
  users: {
    default: '/users',
    getAll: {
      default: '/all',
      getAll: GET,
    },
  },
}
const api = new Route({
  name: 'api',
  routes,
})

api.setHost('http://localhost:3000')
api.setTimeout(5000)
api.setErrorMessages({
  // errors for specific status codes
  403: 'You have not permission for this action',
  404: 'Nothing found, please check filled data',
  default: 'Sorry, error happans, please try again',
  timeout: 'Looks like the server is taking to long to respond, please try again in sometime',
})
api.enableLogs()

// set error messages and timeouts for specific route
api.user.setErrorMessages({
  400: 'Bad request, please don\'t repeat this request again',
  401: 'You need to authorize at first',
})
api.user.setTimeout(1000)

async function action() {
  await api.sigin.fetch({}) // POST:: /signin
  await api.sigup.fetch({}) // POST:: /signup
  await api.user.getById.fetch({}) // GET:: /user
  await api.users.getAll.fetch({}) // GET:: /users/all
}
action()
