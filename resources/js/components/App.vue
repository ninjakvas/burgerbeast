<template>
    <div class="d-flex flex-column page-wrapper" :class="{adminPage: isAdminPage}">
        <Header v-if="!isAdminPage"/>
        <router-view class="flex-fill"></router-view>
        <Footer/>
        <Modal/>
        <Cart :show="showCart"/>
    </div>
</template>

<script>
    import {api} from '@/api'
    import Modal from '@/components/Modal'
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
    import Cart from '@/components/Cart.vue'
    import {mapState} from 'vuex'

    export default {
        mounted() {
            api.interceptors.request.use(config => {
                this.$store.commit('setLoading', true)
                return config;
            }, error => {
                this.$store.commit('setLoading', false)
                return Promise.reject(error);
            });

            api.interceptors.response.use(response => {
                this.$store.commit('setLoading', false)
                return response;
            }, error => {
                this.$store.commit('setLoading', false)
                return Promise.reject(error);
            });
        },
        data() {
            return {
                isAdminPage: false
            }
        },
        components: {
            Header,
            Modal,
            Footer,
            Cart
        },
        computed: {
            ...mapState({
                showCart: state => state.cart.showCart
            })
        },
        watch: {
            $route(to) {
                if (to.path.indexOf('admin') !== -1) {
                    this.isAdminPage = true
                } else {
                    this.isAdminPage = false
                }
            }
        },
    }
</script>
