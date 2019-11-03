import axios from 'axios'

const AUTH_SERVICE_URL = process.env.VUE_APP_AUTHENT_SERVICE_URL

async function authenticated(username, password) {
    const response = await axios.get(
        `${AUTH_SERVICE_URL}/authenticate`,
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
    const response = await axios.get(`${AUTH_SERVICE_URL}/user/${username}`)
    return response.data
}

export default { authenticated, getUser }