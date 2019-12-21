<template>
    <div class="container">
        <h1 class="page-title">Оформление заказа</h1>
        <template v-if="!orderComplete">
            <div class="page-box box-padding mb-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="p in cartProducts" :key="p.id">
                        <td class="w-50">
                            <router-link class="d-flex align-items-center text-decoration-none"
                                         :to="{name: 'product', params: {id: p.id}}">
                                <img :src="p.thumbnail" alt="image">
                                <div class="ml-4">
                                    <h5 class="m-0 text-dark">{{p.title}}</h5>
                                    <div class="text-muted">{{p.subtitle}}</div>
                                </div>
                            </router-link>
                        </td>
                        <td class="w-25 align-middle product-small">{{p.price * p.qty | price}}</td>
                        <td class="w-25 align-middle">
                            <div class="cart-item-qty">
                                <button :disabled="p.qty < 2" @click="decrement(p.id)">
                                    <i class="fa fa-minus"></i>
                                </button>
                                <span>{{p.qty}}</span>
                                <button @click="increment(p.id)">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </td>
                        <td class="align-middle">
                            <button class="text-muted fz-md" @click="removeFromCart(p.id)">
                                <i class="fa fa-times-circle"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="checkout-total">
                    <div class="checkout-bonus">
                        <div class="form-check">
                            <input :disabled="user.bonus < totalCheckoutPrice || !user.bonus"
                                   @change="useBonus"
                                   class="form-check-input" type="checkbox" id="bonus">
                            <label class="form-check-label form-label" for="bonus">Бонусы: {{userBonus}}</label>
                        </div>
                    </div>
                    <div class="product-small">
                        Всего: <span class="text-success">{{totalCheckoutPrice | price}}</span>
                    </div>
                </div>
            </div>
            <div class="page-box box-padding">
                <div v-if="!isAuth" class="row justify-content-center">
                    <div class="col-md-4 py-4">
                        <router-link class="btn btn-outline-danger btn-lg w-100" to="#login">У меня есть аккаунт
                        </router-link>
                    </div>
                </div>
                <div v-else>
                    <div class="title-1">Ваши данные:</div>
                    <dl class="row">
                        <dt class="col-auto">Имя</dt>
                        <dd class="col-auto">{{user.name}}</dd>
                    </dl>
                    <dl class="row">
                        <dt class="col-auto">Телефон:</dt>
                        <dd class="col-auto">{{user.phone}}</dd>
                    </dl>
                    <div v-if="!user.addresses">Загрузка...</div>
                    <div v-else-if="user.addresses.length > 0">
                        <div class="title-1">Адрес:</div>
                        <div v-for="(a, index) in user.addresses" :key="a.id" class="form-check">
                            <input v-model="selectedAddress" class="form-check-input" type="radio" :id="a.id"
                                   :value="index">
                            <label class="form-check-label" :for="a.id">
                                <span class="h4">{{a.address}}</span>
                            </label>
                        </div>
                    </div>
                    <div v-else class="row">
                        <div class="col-12">
                            <div class="title-1">Ваш адрес:</div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Улица, дом, квартира</label>
                                <input type="text"
                                       v-model="address"
                                       class="form-control form-control-lg" autocomplete="off">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!isAuth">
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="name" class="form-label">Имя:</label>
                                <input type="text" v-model="name"
                                       :class="{'is-invalid': errors.name}"
                                       class="form-control form-control-lg" id="name">
                                <div class="invalid-feedback" v-if="errors.name">{{errors.name[0]}}</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Телефон:</label>
                                <imask v-model="phone" :unmask="true" :mask="mask" :lazy="true" type="text"
                                       :class="{'is-invalid': errors.phone}"
                                       class="form-control form-control-lg"/>
                                <div class="invalid-feedback" v-if="errors.phone">{{errors.phone[0]}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="address" class="form-label">Улица, дом, квартира</label>
                                <input id="address" type="text"
                                       v-model="address"
                                       class="form-control form-control-lg" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="email" class="form-label">Email</label>
                                <input id="email" type="email"
                                       v-model="email"
                                       :class="{'is-invalid': errors.email}"
                                       class="form-control form-control-lg" autocomplete="off">
                                <small class="form-text text-muted">На ваш Email будет отправлен пароль для входа в личный кабинет</small>
                                <div class="invalid-feedback" v-if="errors.email">{{errors.email[0]}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center mt-5">
                <div class="col-md-5 text-white">
                    <div class="row justify-content-between font-weight-bold mb-3">
                        <div class="col-auto">Сума</div>
                        <div class="col-auto">{{totalCheckoutPrice | price}}</div>
                    </div>
                    <div v-if="deliveryCost" class="row justify-content-between font-weight-bold mb-3">
                        <div class="col-auto">Доставка</div>
                        <div class="col-auto">{{deliveryCost | price}}</div>
                    </div>
                    <div class="row justify-content-between product-price text-success mb-3">
                        <div class="col-auto">К оплате</div>
                        <div class="col-auto">{{totalCheckoutPrice + 30 | price}}</div>
                    </div>
                    <button @click="submit()"
                            class="btn btn-success btn-lg w-100"
                            :disabled="!fieldsNotEmpty || isLoading">
                        <i class="fa fa-spinner fa-pulse fa-fw mr-2" v-show="isLoading"></i>Оформить заказ
                    </button>
                </div>
            </div>
        </template>
        <checkout-success v-else/>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import {IMaskComponent} from 'vue-imask'
    import CheckoutSuccess from '@/components/CheckoutSuccess.vue'

    export default {
        data() {
            return {
                mask: '{+38} ({\\0}00) 000 00 00',
                name: '',
                phone: '',
                selectedAddress: 0,
                address: '',
                email: ''
            }
        },
        methods: {
            useBonus(event) {
                this.$store.commit('setActiveBonus', event.target.checked)
            },
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
            },
            submit() {
                let data = {
                    address: this.address,
                    products: this.checkoutProducts,
                }
                if (!this.isAuth) {
                    data.name = this.name
                    data.phone = this.phone
                    data.email = this.email
                }
                const payload = {
                    data,
                    params: {bonus: this.activeBonus}
                };
                this.$store.dispatch('createOrder', payload)
                    .then(() => {
                        this.$store.dispatch('orderSuccess')
                    })
            }
        },
        computed: {
            ...mapGetters([
                'totalCheckoutPrice',
                'totalPrice',
                'cartProducts',
                'checkoutProducts',
                'deliveryCost',
                'orderComplete',
                'totalProducts',
                'isAuth']),
            ...mapState({
                activeBonus: state => state.cart.activeBonus,
                errors: state => state.user.errors,
                user: state => state.user.user,
                isLoading: state => state.cart.isLoading
            }),
            userBonus() {
                if (!this.user.bonus) {
                    return 0
                }
                if (this.activeBonus) {
                    return this.user.bonus - this.totalPrice
                }
                return this.user.bonus
            },
            fieldsNotEmpty() {
                let data = [
                    this.address,
                ]
                if (!this.isAuth) {
                    data.push(this.name, this.phone, this.email)
                }
                return data.every(item => item)
            }
        },
        mounted() {
            this.$store.commit('hideCart')
            this.$store.commit('setOrderComplete', false)
            if (!this.totalProducts) {
                this.$router.push({name: 'home'})
            }
            if (this.isAuth) {
                this.$store.dispatch('checkAuth')
                    .then(resp => {
                        if (resp.addresses.length) {
                            this.address = resp.addresses[0].address
                        }
                    })
            }
        },
        watch: {
            totalCheckoutPrice() {
                if (this.orderComplete) {
                    return
                }
                if (!this.totalProducts) {
                    this.$router.push({name: 'home'})
                }
            },
            selectedAddress() {
                this.address = this.user.addresses[this.selectedAddress].address
            },
            isAuth() {
                this.address = this.user.addresses[0].address
            },
        },
        components: {
            imask: IMaskComponent,
            CheckoutSuccess
        }
    }
</script>

<style lang="scss">
    .checkout-total {
        display: flex;
        max-width: 400px;
        margin-left: auto;
        align-items: center;
        justify-content: space-between;
        border: 1px solid rgba(0, 0, 0, 0.05);
        padding: 10px;
        background: rgba(0, 0, 0, 0.03);
    }

    .checkout-bonus {
        user-select: none;
    }
</style>