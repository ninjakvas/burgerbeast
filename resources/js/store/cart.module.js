import {getItems, saveItems, emptyItems} from '@/cart.storage'
import JwtStorage from '@/jwt.storage'
import {api, setToken} from "@/api";
import _ from 'lodash'

export default {
    state: {
        isLoading: false,
        orderComplete: false,
        deliveryCost: 30,
        orders: {},
        showCart: false,
        items: getItems() || [],
        activeBonus: 0
    },
    mutations: {
        setLoading(state, value) {
            state.isLoading = value
        },
        setActiveBonus(state, value) {
            state.activeBonus = +value
        },
        setOrders(state, orders) {
            state.orders = orders
        },
        showCartToggle(state) {
            if (!state.showCart) {
                state.showCart = true
                document.getElementsByTagName('html')[0].classList.add('no-scroll')
            } else {
                state.showCart = false
                document.getElementsByTagName('html')[0].classList.remove('no-scroll')
            }
        },
        hideCart(state) {
            state.showCart = false
            document.getElementsByTagName('html')[0].classList.remove('no-scroll')
        },
        pushProductToCart(state, product) {
            state.items.push({
                ...product,
                qty: 1
            })
        },
        incrementItemQty(state, id) {
            const cartItem = state.items.find(item => item.id === id)
            cartItem.qty++
        },
        decrementItemQty(state, id) {
            const cartItem = state.items.find(item => item.id === id)
            cartItem.qty--
        },
        removeProductFromCart(state, id) {
            state.items = state.items.filter(item => item.id !== id)
        },
        emptyCart(state) {
            state.items = []
            state.orderComplete = true
        },
        setOrderComplete(state, value) {
            state.orderComplete = value
        },
        resetOrders(state) {
            state.orders = {}
        }
    },
    actions: {
        getOrders({commit}, params) {
            return new Promise((resolve, reject) => {
                api.get('orders', {params})
                    .then(resp => {
                        commit('setOrders', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err)
                    })
            })
        },
        createOrder({commit, getters}, {data, params}) {
            return new Promise((resolve, reject) => {
                api.post('orders', data, {params})
                    .then(resp => {
                        commit('setAuth', resp.data)
                        if (resp.data.token) {
                            JwtStorage.saveToken(resp.data.token)
                            setToken(resp.data.token)
                        }
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('setErrors', err)
                        reject()
                    })
            })
        },
        updateOrder({commit}, {id, status}) {
            api.patch('orders/' + id, {status: status})
        },
        orderSuccess({commit}) {
            commit('emptyCart')
            emptyItems()
            commit('setActiveBonus', false)
        },
        addToCart({commit, state}, product) {
            const cartItem = state.items.find(item => item.id === product.id)
            if (!cartItem) {
                commit('pushProductToCart', product)
            } else {
                commit('incrementItemQty', cartItem.id)
            }
            saveItems(state.items)
        },
        removeFromCart({commit, state}, id) {
            const cartItem = state.items.find(item => item.id === id)
            if (cartItem) {
                commit('removeProductFromCart', cartItem.id)
                saveItems(state.items)
            }
        },
        increment({commit, state}, id) {
            commit('incrementItemQty', id)
            saveItems(state.items)
        },
        decrement({commit, state}, id) {
            const cartItem = state.items.find(item => item.id === id)
            if (cartItem.qty > 1) {
                commit('decrementItemQty', id)
            }
            saveItems(state.items)
        }
    },
    getters: {
        totalProducts(state) {
            return state.items.length
        },
        totalPrice(state) {
            return state.items.reduce((total, product) => {
                return total + product.price * product.qty
            }, 0)
        },
        totalCheckoutPrice(state, getters) {
            const bonus = getters.user.bonus

            let total = state.items.reduce((total, product) => {
                return total + product.price * product.qty
            }, 0)

            if (bonus >= total && state.activeBonus) {
                return 0
            }
            return total
        },
        cartProducts(state) {
            return state.items
        },
        checkoutProducts(state) {
            return state.items.map(product => {
                return _.pick(product, ['id', 'qty'])
            })
        },
        deliveryCost(state) {
            return state.deliveryCost
        },
        orderComplete(state) {
            return state.orderComplete
        }
    },
}