<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">Заказов</div>
                    <div class="card-body">
                        <div class="new-orders-count">
                            <span>{{orders.total}}</span>
                            <span v-if="user.notifications.length"
                                  class="text-success">+{{user.notifications.length}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">Клиентов</div>
                    <div class="card-body"><span class="new-orders-count">{{users.total}}</span></div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">Товаров</div>
                    <div class="card-body"><span class="new-orders-count">{{products.total}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({
                user: state => state.user.user,
                users: state => state.admin.users,
                orders: state => state.cart.orders,
                products: state => state.admin.products
            })
        },
        mounted() {
            this.$store.dispatch('getUsers')
            this.$store.dispatch('getProducts')
            this.$store.dispatch('getOrders', {all: 1})
        },
    }
</script>

<style lang="scss">
    .new-orders-count {
        font-size: 2.5em;
        font-weight: bold;
    }
</style>