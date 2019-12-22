<template>
    <div class="container text-white">
        <transition name="fade">
            <div class="row align-items-center justify-content-center" v-if="loaded">
                <div class="col-md-6 col-xl-auto mb-3">
                    <img class="product-img" :src="product.image" alt="image">
                </div>
                <div class="col-md-6 col-xl-5">
                    <h1 class="title-2">{{product.title}}</h1>
                    <h5 class="text-muted mb-4">{{product.subtitle}}</h5>
                    <div v-html="product.body"></div>
                    <hr class="my-4">
                    <span class="price-2 mr-4">{{product.price | price}}</span>
                    <button class="btn btn-danger btn-lg px-4" @click="addToCart(product)">
                        <i class="fa fa-shopping-basket mr-2"></i>В корзину
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                loaded: false
            }
        },
        mounted() {
            this.$store.dispatch('getProduct', this.$route.params.id)
                .then(() => this.loaded = true)
        },
        methods: {
            addToCart(item) {
                this.$store.dispatch('addToCart', item)
            },
        },
        computed: {
            ...mapState({
                product: state => state.admin.product
            })
        },
    }
</script>

<style lang="scss">
    img.product-img {
        max-width: 450px;
        width: 100%;
    }
    .container.text-white {
        padding-top: 60px;
    }
</style>
