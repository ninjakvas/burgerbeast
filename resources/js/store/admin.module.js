import {api} from '@/api'

export default {
    state: {
        overlayActive: false,
        users: {},
        products: {},
        tags: {},
        tagProducts: {},
        product: {},
        errors: []
    },
    mutations: {
        setTagProducts(state, tagProducts) {
            state.tagProducts = tagProducts
        },
        setOverlayActive(state, value) {
            state.overlayActive = value
        },
        removeTag(state, tagId) {
            state.tags.data = state.tags.data.filter(tag => tag.id !== tagId)
        },
        addTag(state, tag) {
            state.tags.data.push(tag)
        },
        setTags(state, tags) {
            state.tags = tags
        },
        setUsers(state, users) {
            state.users = users
        },
        setProducts(state, products) {
            state.products = products
        },
        setProduct(state, product) {
            state.product = product
        },
        setErrors(state, err) {
            if (err.response.data.errors) {
                state.errors = err.response.data.errors
            } else {
                state.errors = err.response.data
            }
        },
    },
    actions: {
        removeProduct({commit}, id) {
            return new Promise((resolve, reject) => {
                return api.delete('products/' + id)
                    .then(() => {
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                        reject()
                    })
            })
        },
        showTagProducts({commit}, {name, params}) {
            return new Promise((resolve, reject) => {
                api.get('tags/' + name, {params})
                    .then(resp => {
                        commit('setTagProducts', resp.data)
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        createTag({commit}, payload) {
            return new Promise((resolve, reject) => {
                api.post('tags', payload)
                    .then(resp => {
                        commit('addTag', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err => {
                        commit('setErrors', err)
                        reject(err)
                    })
            })
        },
        updateTag({commit}, {id, payload}) {
            return new Promise((resolve, reject) => {
                api.patch('tags/' + id, payload)
                    .then(resp => {
                        resolve(resp.data)
                    })
                    .catch(err => {
                        commit('setErrors', err)
                        reject(err)
                    })
            })
        },
        removeTag({commit}, id) {
            return new Promise((resolve, reject) => {
                api.delete('tags/' + id)
                    .then(() => {
                        commit('removeTag', id)
                        resolve()
                    })
                    .catch(err => reject(err))
            })
        },
        getTags({commit}, page) {
            page = page || 1
            api.get('tags?page=' + page)
                .then((resp) => commit('setTags', resp.data))
                .catch(err => {
                    console.log(err);
                })
        },
        getUsers({commit}, page) {
            page = page || 1
            api.get('users?page=' + page)
                .then((resp) => commit('setUsers', resp.data))
                .catch(err => {
                    console.log(err);
                })
        },
        getProducts({commit}, params) {
            return new Promise((resolve, reject) => {
                api.get('products', {params})
                    .then((resp) => {
                        commit('setProducts', resp.data)
                        resolve()
                    })
                    .catch(err => {
                        console.log(err);
                        reject()
                    })
            })
        },
        getProduct({commit}, id) {
            return new Promise((resolve, reject) => {
                api.get('products/' + id)
                    .then(resp => {
                        commit('setProduct', resp.data)
                        resolve()
                    })
                    .catch(err => {
                        console.log(err);
                        reject()
                    })
            })
        },
        updateProduct({commit}, payload) {
            return new Promise((resolve, reject) => {
                api.post('products/' + payload.id, payload.data)
                    .then(() => {
                        resolve()
                    })
                    .catch(err => {
                        commit('setErrors', err)
                        reject()
                    })
            })
        },
        createProduct({commit}, formData) {
            return new Promise((resolve, reject) => {
                api.post('products', formData)
                    .then(() => {
                        resolve()
                    })
                    .catch(err => {
                        commit('setErrors', err)
                        reject()
                    })
            })
        }
    },
    getters: {}
}