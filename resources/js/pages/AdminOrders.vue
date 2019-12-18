<template>
    <div class="position-relative h-100">
        <div v-if="!orders.data" class="overlay-spinner">
            <div class="lds-dual-ring"></div>
        </div>
        <div v-else>
            <div v-if="orders.data.length" class="list-group mb-4">
                <order-list-item v-for="order in orders.data" :key="order.id" :order="order"/>
            </div>
            <div v-else class="text-info">У вас нет заказов. Похоже бизнес идет не очень хорошо 😁</div>
        </div>
        <Pagination :data="orders"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Pagination from '@/components/Pagination.vue'
    import OrderListItem from '@/components/OrderListItem.vue'

    export default {
        computed: {
            ...mapState({
                orders: state => state.cart.orders,
                user: state => state.user.user
            })
        },
        beforeMount() {
            this.$store.commit('resetOrders')
            this.user.notifications = []
        },
        mounted() {
            const params = {...this.$route.query, all: 1, reset: 1}
            this.$store.dispatch('getOrders', params)
        },
        components: {
            Pagination,
            OrderListItem
        },
        watch: {
            $route(to, from) {
                if (to.hash || from.hash) {
                    return
                }
                const params = {...to.query, all: 1}
                this.$store.dispatch('getOrders', params)
            }
        },
    }
</script>
