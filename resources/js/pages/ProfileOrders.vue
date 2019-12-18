<template>
    <div class="box-padding">
        <h2 class="title-1">Мои заказы:</h2>
        <div v-if="!orders.data" class="overlay-spinner">
            <div class="lds-dual-ring"></div>
        </div>
        <div v-else class="mb-5">
            <div v-if="orders.data.length">
                <div class="media order-item mb-4" v-for="order in orders.data" :key="order.id">
                    <div class="media-body">
                        <div class="bg-light p-3">
                            <div class="row align-items-center">
                                <div class="col-md-auto product-small">Заказ №{{order.id}}</div>
                                <small class="col-md-auto text-secondary">адрес: {{order.address}}</small>
                                <small class="col-md-auto ml-auto">{{order.created_at | date}}</small>
                                <div class="col-md-auto"
                                     :class="{'text-warning': !order.status, 'text-success': order.status}">
                                    <div class="order-status">
                                        <i class="fa fa-clock-o" v-if="!order.status"></i>
                                        <i class="fa fa-check-circle" v-else></i>
                                        {{order.status | status}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ml-md-5">
                            <div class="media mt-3" v-for="p in order.products">
                                <router-link class="pr-3" :to="{name: 'product', params: {id: p.id}}">
                                    <img :src="p.thumbnail" alt="product">
                                </router-link>
                                <div class="media-body">
                                    <h5 class="m-0">
                                        {{p.title}}
                                    </h5>
                                    <div class="text-muted">{{p.subtitle}}</div>
                                    <div class="font-weight-bold">
                                        <span class="mr-2">{{p.price | price}}</span>
                                        <span class="mr-2">{{p.pivot.qty}}шт.</span>
                                        <span class="text-danger">{{p.price * p.pivot.qty | price}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 product-small text-danger">Итого к оплате: {{order.total}} грн</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>У вас еще нет заказов</div>
        </div>
        <Pagination :data="orders"/>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination.vue'
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({
                orders: state => state.cart.orders,
                user: state => state.user.user
            }),
        },
        mounted() {
            this.$store.dispatch('getOrders', this.$route.query)
        },
        components: {
            Pagination
        },
        watch: {
            $route(to, from) {
                if (to.hash || from.hash) {
                    return
                }
                this.$store.dispatch('getOrders', to.query)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .order-status {
        width: 110px;
        text-align: right;
    }
</style>
