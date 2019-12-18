<template>
    <header id="header">
        <div class="container">
            <div class="row align-items-center py-3">
                <div class="col-auto mr-auto">
                    <span class="text-white font-weight-bold"><i class="fa fa-phone mr-2"></i>0 800 342 33 20</span>
                </div>
                <div class="col-auto">
                    <user-dropdown v-if="isAuth" :user="user"/>
                    <router-link v-else class="text-white" to="#login">
                        <i class="fa fa-sign-in mr-2"></i>Вход
                    </router-link>
                </div>
                <div class="col-auto" v-if="user.is_admin">
                    <router-link to="/admin" class="text-white">
                        <i class="fa fa-lock"></i> Админ-панель
                    </router-link>
                </div>
            </div>
            <div class="row align-items-center py-3 no-gutters">
                <router-link :to="{name: 'home'}" class="col-sm-auto mr-sm-auto">
                    <img class="logo mx-auto" src="/img/logo-1.png" alt="logo">
                </router-link>
                <div class="col-auto d-none d-xl-block">
                    <div class="row no-gutters">
                        <div v-for="nav in mainNav" :key="nav.id" class="col-auto">
                            <router-link class="menu-item"
                                         active-class="active"
                                         exact
                                         :to="{name: 'tags', params: {tag: nav.slug}}">{{nav.name}}
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-sm-auto">
                    <button ref="button" class="cart-button" :class="cartAnimation" @click="showCart">
                        <i class="fa fa-shopping-cart mr-2">
                            <span v-if="totalProducts">{{totalProducts}}</span>
                        </i>
                        <span v-if="totalPrice">{{totalPrice | price}}</span>
                        <span v-else>Корзина</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import UserDropdown from '@/components/UserDropdown.vue'
    import {mapState, mapGetters} from 'vuex'
    import {api} from '@/api'

    export default {
        data() {
            return {
                mainNav: [],
                cartAnimation: 'animated'
            }
        },
        mounted() {
            api.get('tags', {
                params: {
                    nav: 1
                }
            })
                .then(resp => {
                    this.mainNav = resp.data
                })
        },
        methods: {
            showCart() {
                this.$store.commit('showCartToggle')
            }
        },
        filters: {
            trim: function (value, len) {
                if (!value) {
                    return
                }
                if (value.length > len) {
                    return value.substr(0, len) + '...'
                }
                return value
            }
        },
        computed: {
            ...mapState({
                isAuth: state => state.user.isAuth,
                user: state => state.user.user,
                cart: state => state.cart.cart,
            }),
            ...mapGetters(['totalProducts', 'totalPrice']),
        },
        components: {
            UserDropdown
        },
        watch: {
            totalPrice(newPrice, oldPrice) {
                const animationName = 'heartBeat'

                if (newPrice > oldPrice) {
                    this.cartAnimation = `${this.cartAnimation} ${animationName}`
                    this.$refs.button.addEventListener('animationend', () => {
                        this.cartAnimation = 'animated'
                    })
                }
            }
        },
    }
</script>
