<template>
    <div>
        <catalog class="mt-4" :products="tagProducts.data"/>
        <pagination :data="tagProducts"/>
    </div>
</template>

<script>
    import Catalog from '@/components/Catalog.vue'
    import Pagination from '@/components/Pagination.vue'
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({
                tagProducts: state => state.admin.tagProducts
            })
        },
        mounted() {
            const data = {
                name: this.$route.params.tag,
                params: this.$route.query
            }
            this.$store.dispatch('showTagProducts', data)
                .catch(() => this.$router.push({name: '404'}))
        },
        watch: {
            $route(to, from) {
                if (to.hash || from.hash) {
                    return
                }
                const data = {
                    name: to.params.tag,
                    params: to.query
                }
                this.$store.dispatch('showTagProducts', data)
            }
        },
        components: {
            Catalog,
            Pagination
        }
    }
</script>