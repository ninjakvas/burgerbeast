<template>
    <div>
        <transition name="slide-right">
            <div class="cart" v-if="show">
                <button type="button" class="close close-cart" aria-label="Close" @click="close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="h-100">
                    <div class="cart-title p-4">Корзина</div>
                    <div class="cart-items p-4" v-if="totalPrice">
                        <div class="cart-item" v-for="p in cartProducts" :key="p.id">
                            <div class="d-flex align-items-center">
                                <img :src="p.thumbnail" alt="image">
                                <div class="ml-3 w-100">
                                    <h5 class="m-0 text-dark">{{p.title}}</h5>
                                    <div class="cart-item-qty">
                                        <button :disabled="p.qty < 2" @click="decrement(p.id)">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                        <span>{{p.qty}}</span>
                                        <button @click="increment(p.id)">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                    <div class="product-small text-danger">{{p.price * p.qty | price}}</div>
                                </div>
                                <button type="button"
                                        @click="removeFromCart(p.id)"
                                        class="close mr-2" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-4" v-else>Пусто :(</div>
                    <div class="cart-total p-4" v-if="totalPrice">
                        <div class="d-flex mb-2">
                            <div>Сумма</div>
                            <div class="product-price ml-auto">{{totalPrice | price}}</div>
                        </div>
                        <router-link to="/checkout" class="btn btn-success btn-lg w-100">Заказать</router-link>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="overlay-cart" v-if="show" @click="close"></div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        methods: {
            close() {
                this.$store.commit('showCartToggle')
            },
            removeFromCart(id) {
                this.$store.dispatch('removeFromCart', id)
            },
            increment(id) {
                this.$store.dispatch('increment', id)
            },
            decrement(id) {
                this.$store.dispatch('decrement', id)
            }
        },
        props: {
            show: {
                type: Boolean,
                default: 0
            },
        },
        computed: {
            ...mapGetters(['totalPrice', 'cartProducts'])
        },
        watch: {
            totalPrice() {
                if (!this.totalPrice) {
                    this.$store.commit('hideCart')
                }
            }
        },
    }
</script>

<style lang="scss">
    .slide-right-enter-active, .slide-right-leave-active {
        transition: all .35s ease-in-out;
    }

    .slide-right-enter, .slide-right-leave-to {
        transform: translateX(100%)
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .25s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>