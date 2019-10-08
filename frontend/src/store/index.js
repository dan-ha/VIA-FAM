import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        facilities: [],
        loading: false,
        error: ""
    },
    getters: {
        facilities: (state) => state.facilities,
        facility: (state) => (name) => state.facilities.find((f) => f.name === name),
        loading: (state) => state.loading,
        error: (state) => state.error,
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
        }
    }
})
