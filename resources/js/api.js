import axios from 'axios'

export const api = axios.create({
    baseURL: '/api'
})

export const setToken = token => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
