import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user.module'
import admin from './admin.module'
import cart from './cart.module'

export default new Vuex.Store({
    modules: {
        user,
        admin,
        cart
    }
})
