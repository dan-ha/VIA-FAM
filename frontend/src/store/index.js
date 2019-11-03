import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        facilities: [],
        loading: false,
        error: "",
        authenticated: localStorage['authenticated'] ? JSON.parse(localStorage['authenticated']) : false,
        user: localStorage['user'] ? JSON.parse(localStorage['user']) : null
    },
    getters: {
        facilities: (state) => state.facilities,
        facility: (state) => (name) => state.facilities.find((f) => f.name === name),
        loading: (state) => state.loading,
        error: (state) => state.error,
        authenticated: (state) => state.authenticated,
        user: (state) => state.user
    },
    mutations: {
        API_DATA_PENDING: (state) => {
            state.loading = true
        },
        API_DATA_SUCCESS: (state, facilities) => {
            state.loading = false
            state.facilities = facilities
        },
        API_DATA_FAILURE: (state, error) => {
            state.loading = false
            state.facilities = [{ name: 'error' }]
            state.error = error
        },
        LOGGED_IN: (state) => {
            state.authenticated = true
            localStorage.setItem('authenticated', state.authenticated)
        },
        LOGGED_OUT: (state) => {
            state.authenticated = false
            localStorage.setItem('authenticated', state.authenticated)
        },
        SET_USER: (state, user) => {
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        }
    },
    actions: {
        fetchFacilities: (context) => {
            context.commit('API_DATA_PENDING')
            return axios.get(`${process.env.VUE_APP_BACKEND_URL}/facility`)
                .then(response => {
                    context.commit('API_DATA_SUCCESS', response.data)
                })
                .catch(error => {
                    context.commit('API_DATA_FAILURE', error)
                })
        },
        fetchFacility: ({ commit, getters }, name) => {
            if (!getters.getFacility(name)) {
                return axios.get(`${process.env.VUE_APP_BACKEND_URL}/facility/${name}`)
                    .then(response => {
                        commit('API_DATA_SUCCESS', [response.data])
                    })
                    .catch(error => {
                        commit('API_DATA_FAILURE', error)
                    })
            }
        }
    }
})