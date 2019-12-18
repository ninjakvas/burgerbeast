<template>
    <div>
        <!--<home-slider/>-->
        <catalog class="mt-4" :products="products.data"/>
        <pagination :data="products"/>
    </div>
</template>

<script>
    import HomeSlider from '@/components/HomeSlider.vue'
    import Catalog from '@/components/Catalog.vue'
    import Pagination from '@/components/Pagination.vue'
    import {mapState} from 'vuex'

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
            $route(to, from) {
                if (to.hash || from.hash) {
                    return
                }
                this.$store.dispatch('getProducts', to.query)
            }
        },
        components: {
            HomeSlider,
            Catalog,
            Pagination
        }
    }
</script>
