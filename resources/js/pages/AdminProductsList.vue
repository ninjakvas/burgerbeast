<template>
    <div class="position-relative h-100">
        <div v-if="!products.data" class="overlay-spinner">
            <div class="lds-dual-ring"></div>
        </div>
        <div v-else>
            <div class="list-group mb-3" v-if="products.data.length">
                <router-link :to="{name: 'admin-products-edit', params: {id: p.id}}"
                             v-for="p in products.data"
                             :key="p.id"
                             class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex">
                        <img :src="p.thumbnail" alt="image">
                        <div class="ml-3 w-100">
                            <div class="d-flex w-100">
                                <h4 class="m-0">{{p.title}}</h4>
                                <small class="ml-auto">{{p.created_at | date}}</small>
                            </div>
                            <small class="text-muted">{{p.subtitle}}</small>
                            <div class="text-danger font-weight-bold">{{p.price | price}}</div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div v-else>Пусто</div>
        </div>

        <Pagination :data="products"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Pagination from '@/components/Pagination.vue'

    export default {
        computed: {
            ...mapState({
                products: state => state.admin.products
            }),
        },
        mounted() {
            this.$store.dispatch('getProducts', this.$route.query)
        },
        watch: {
            $route(to) {
                this.$store.dispatch('getProducts', to.query);
            }
        },
        components: {
            Pagination
        }
    }
</script>