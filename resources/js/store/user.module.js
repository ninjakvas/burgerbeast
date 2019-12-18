import JwtStorage from '@/jwt.storage'
import {api, setToken} from "@/api";
import router from '@/router'

export default {
    state: {
        isAuth: !!JwtStorage.getToken(),
        user: {},
        errors: []
    },
    mutations: {
        setAuth(state, user) {
            state.isAuth = true
            state.user = user
            state.errors = []
        },
        purgeAuth(state) {
            state.isAuth = false
            state.user = {}
            state.errors = []
            JwtStorage.destroyToken()
        },
        setErrors(state, err) {
            if (err.response.data.errors) {
                state.errors = err.response.data.errors
            } else {
                state.errors = err.response.data
            }
        },
        removeAddress(state, id) {
            state.user.addresses = state.user.addresses.filter((value) => {
                return value.id !== id
            })
        },
        addAddress(state, address) {
            state.user.addresses.push(address)
        }
    },
    actions: {
        storeAddress({commit}, payload) {
            api.post('address', payload)
                .then((resp) => {
                    commit('addAddress', resp.data)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        deleteAddress({commit}, id) {
            return new Promise((resolve, reject) => {
                api.delete(`address/${id}`)
                    .then(() => {
                        commit('removeAddress', id)
                        resolve()
                    })
                    .catch(err => {
                        reject(err.response.data)
                    })
            })
        },
        update({commit}, payload) {
            return new Promise((resolve, reject) => {
                api.put('users', payload)
                    .then(resp => {
                        commit('setAuth', resp.data)
                        resolve()
                    })
                    .catch(err => {
                        commit('setErrors', err)
                        reject()
                    })
            })
        },
        auth({commit}, payload) {
            let url = 'users/login'
            if (payload.reg) {
                url = 'users'
            }
            return new Promise((resolve, reject) => {
                api.post(url, payload.form)
                    .then(resp => {
                        commit('setAuth', resp.data)
                        JwtStorage.saveToken(resp.data.token)
                        setToken(resp.data.token)
                        resolve()
                    })
                    .catch(err => {
                        commit('setErrors', err)
                        reject()
                    })
            })
        },
        logout({commit}) {
            api.post('users/logout').then(() => commit('purgeAuth'))
        },
        checkAuth({commit}) {
            if (JwtStorage.getToken()) {
                setToken(JwtStorage.getToken())
                return new Promise((resolve, reject) => {
                    api.get('users/current')
                        .then(resp => {
                            commit('setAuth', resp.data)
                            resolve(resp.data)
                        })
                        .catch(err => {
                            commit('setErrors', err)
                            commit('purgeAuth')
                            router.push('/')
                            reject()
                        })
                })
            } else {
                commit('purgeAuth')
                return false
            }
        }
    },
    getters: {
        isAuth(state) {
            return state.isAuth
        },
        user(state) {
            return state.user
        },
    }
}