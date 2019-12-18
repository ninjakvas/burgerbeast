<template>
    <div class="container">
        <div class="row">
            <div class="col-auto ml-auto mb-3">
                <dropdown ref="sort" :current="current" :show="show" @open="show = !show">
                    <button @click="reset">По популярности</button>
                    <button @click="query('asc', $event)">Сначала дешевле</button>
                    <button @click="query('desc', $event)">Сначала дороже</button>
                </dropdown>
            </div>
        </div>
        <div v-if="isLoading || !products" class="lds-dual-ring catalog-spinner"></div>
        <div v-else-if="products.length" class="row">
            <catalog-item v-for="p in products" :key="p.id" :product="p" @addToCart="addToCart"/>
        </div>
        <div v-else class="text-white text-center mt-4">Здесь пусто :(</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Dropdown from '@/components/Dropdown.vue'
    import _ from 'lodash'
    import CatalogItem from '@/components/CatalogItem.vue'

    export default {
        created() {
            window.addEventListener('click', (e) => {
                if (!this.$refs.sort) {
                    return
                }
                if (!this.$refs.sort.$el.contains(e.target)) {
                    this.show = false
                }
            })
        },
        props: {
            products: {
                type: Array,
                default: null
            },
        },
        data() {
            return {
                show: false,
                current: 'По популярности'
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.cart.isLoading
            })
        },
        methods: {
            addToCart(item) {
                this.$store.dispatch('addToCart', item)
            },
            query(price, event) {
                if (this.$route.query.price !== price) {
                    this.$router.push({query: {price}})
                }
                this.show = false
                this.current = event.target.textContent
            },
            reset() {
                if (this.$route.query.price) {
                    const query = _.omit(this.$route.query, 'price')
                    this.$router.replace({query})
                }
                this.show = false
                this.current = event.target.textContent
            }
        },
        components: {
            Dropdown,
            CatalogItem,
        }
    }
</script>
