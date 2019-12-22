<template>
    <div class="col-sm-6 col-lg-4">
        <div class="card text-center">
            <router-link class="product-image" :to="{name: 'product', params: {id: product.id}}">
                <img :src="product.image" alt="image">
            </router-link>
            <div class="card-body">
                <h4 class="card-title font-weight-bold">
                    <router-link :to="{name: 'product', params: {id: product.id}}">{{product.title}}
                    </router-link>
                </h4>
                <div class="text-light mb-2" v-if="product.subtitle">{{product.subtitle}}</div>
                <div class="product-description" v-html="product.body"></div>
                <div class="product-price text-danger mb-3">{{product.price | price}}</div>
                <button class="btn btn-danger w-100 btn-lg" @click="$emit('addToCart', product)">
                    <i class="fa fa-shopping-cart mr-2"></i> В корзину
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                default: null
            },
        },
    }
</script>

<style lang="scss" scoped>
    .card {
        margin-bottom: 30px;
        background: none;
        border: 1px solid rgba(255, 255, 255, .1);
        overflow: hidden;
        color: #fff;
    }

    .card-title a {
        text-decoration: none;
        color: #f1f1f1;

        &:hover {
            opacity: .8;
        }
    }
</style>
