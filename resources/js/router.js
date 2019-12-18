import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Home from '@/pages/Home.vue'
import Profile from '@/pages/Profile.vue'
import ProfileGeneral from '@/pages/ProfileGeneral.vue'
import ProfileOrders from '@/pages/ProfileOrders.vue'
import Admin from '@/pages/Admin.vue'
import AdminOrders from '@/pages/AdminOrders.vue'
import AdminHome from '@/pages/AdminHome.vue'
import AdminUsers from '@/pages/AdminUsers.vue'
import AdminProducts from '@/pages/AdminProducts.vue'
import AdminProductsCreate from '@/pages/AdminProductsCreate.vue'
import AdminProductsList from '@/pages/AdminProductsList.vue'
import AdminProductsEdit from '@/pages/AdminProductsEdit.vue'
import AdminTags from '@/pages/AdminTags.vue'
import Product from '@/pages/Product.vue'
import Checkout from '@/pages/Checkout.vue'
import PageNotFound from '@/pages/PageNotFound.vue'
import Tags from '@/pages/Tags.vue'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (store.state.user.isAuth) {
        next()
    } else {
        next('/')
    }
}
const checkIfAdmin = async (to, from, next) => {
    const user = await store.dispatch('checkAuth')
    if (user && user.is_admin) {
        next()
    } else {
        next('/')
    }
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/404',
            name: '404',
            component: PageNotFound
        },
        {
            path: '*',
            redirect: '404'
        },
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/profile',
            component: Profile,
            beforeEnter: ifAuthenticated,
            children: [
                {
                    path: '/',
                    name: 'profile',
                    component: ProfileGeneral
                },
                {
                    path: 'orders',
                    name: 'profile-orders',
                    component: ProfileOrders
                }
            ]
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/admin',
            component: Admin,
            beforeEnter: checkIfAdmin,
            children: [
                {
                    path: '/',
                    name: 'admin-home',
                    component: AdminHome
                },
                {
                    path: 'orders',
                    name: 'admin-orders',
                    component: AdminOrders
                },
                {
                    path: 'users',
                    name: 'admin-users',
                    component: AdminUsers
                },
                {
                    path: 'tags',
                    name: 'admin-tags',
                    component: AdminTags
                },
                {
                    path: 'products',
                    component: AdminProducts,
                    children: [
                        {
                            path: '/',
                            name: 'admin-products-list',
                            component: AdminProductsList
                        },
                        {
                            path: 'create',
                            name: 'admin-products-create',
                            component: AdminProductsCreate
                        },
                        {
                            path: ':id',
                            name: 'admin-products-edit',
                            component: AdminProductsEdit
                        },
                    ],
                }
            ]
        },
        {
            path: '/products/:id',
            name: 'product',
            component: Product
        },
        {
            path: '/:tag',
            name: 'tags',
            component: Tags
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash || from.hash) {
            return savedPosition
        }
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})