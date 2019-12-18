import Vue from 'vue'
import App from '@/components/App.vue'
import Toasted from 'vue-toasted'
import VueAgile from 'vue-agile'
import router from './router'
import store from './store/store'
import {
    filterDate,
    filterPrice,
    filterTrim,
    filterStatus
} from './vue-filters'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/scss/font-awesome.scss'

store.dispatch('checkAuth')

Vue.use(Toasted, {
    duration: 4000
})
Vue.use(VueAgile)
window.onload = () => {
    document.getElementById('cooking-loader').style.display = 'none'
}

Vue.filter('date', filterDate)
Vue.filter('price', filterPrice)
Vue.filter('trim', filterTrim)
Vue.filter('status', filterStatus)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
