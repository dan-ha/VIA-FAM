import axios from 'axios'

const AUTH_SERVICE_URL = process.env.VUE_APP_AUTHENT_SERVICE_URL

const axiosIns = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: 1000
})

async function authenticated(username, password) {
  const response = await axiosIns.get('/authenticate',
    {
      params: {
        username,
        password
      }
    }
  )
  return response.data.authenticated
}

async function getUser(username) {
  const response = await axiosIns.get(`/user/${username}`)
  return response.data
}

async function getEmployees() {
  const response = await axiosIns.get('/user',
    {
      params: {
        role: 'employee'
      }
    })
  return response.data
}

export default { authenticated, getUser, getEmployees }