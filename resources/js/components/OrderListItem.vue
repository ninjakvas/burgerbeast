<template>
    <div class="list-group-item list-group-item-action" :class="{expanded: show, completed: order.status}">
        <div class="row align-items-center">
            <div class="col-md-auto"><span class="order-id">№{{order.id}}</span></div>
            <div class="col-md-auto">
                <div>{{order.user.phone}}</div>
            </div>
            <div class="col-md-2">{{order.user.name}}</div>
            <div class="col-md-2">{{order.created_at | date}}</div>
            <div class="col-md">{{order.address}}</div>
            <div class="col-md-auto">
                <select @change="changeStatus(order.id, $event)" class="custom-select custom-select-sm"
                        v-model="order.status">
                    <option value="0">В обработке</option>
                    <option value="1">Выполнен</option>
                </select>
            </div>
            <div class="col-md-auto"><div class="order-price">{{order.total | price}}</div></div>
            <div class="col-auto">
                <button class="button-expand" @click="show = !show"><i class="fa fa-caret-down"></i></button>
            </div>
        </div>
        <transition name="slide"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave">
            <div v-if="show" class="order-body">
                <table class="table table-sm m-0">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Наименование</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Кол.</th>
                        <th scope="col">Всего</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="p in order.products">
                        <td>
                            <router-link :to="{name: 'product', params: {id: p.id}}">
                                <img width="70" height="50" :src="p.thumbnail" alt="image">
                            </router-link>
                        </td>
                        <td class="w-100">
                            <router-link class="text-dark"
                                         :to="{name: 'product', params: {id: p.id}}">{{p.title}}
                            </router-link>
                            <div class="text-muted">{{p.subtitle}}</div>
                        </td>
                        <td class="text-nowrap">{{p.price | price}}</td>
                        <td class="text-nowrap">x {{p.pivot.qty}}</td>
                        <td class="text-nowrap">{{p.price * p.pivot.qty | price}}</td>
                    </tr>
                    </tbody>
                </table>
                <table class="float-right table-total">
                    <tr v-if="deliveryCost">
                        <td>Доставка:</td>
                        <td><span>{{deliveryCost | price}}</span></td>
                    </tr>
                    <tr>
                        <td>Всего:</td>
                        <td><span class="text-success">{{order.total + 30 | price}}</span></td>
                    </tr>
                </table>
            </div>
        </transition>
    </div>
</template>

<script>
    import Velocity from 'velocity-animate'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                show: false
            }
        },
        props: {
            order: {
                type: Object,
                default: null
            },
        },
        methods: {
            changeStatus(id, event) {
                this.$store.dispatch('updateOrder', {
                        id,
                        status: event.target.value
                    }
                )
            },
            beforeEnter(el) {
                el.style.height = 0
            },
            enter(el, done) {
                el.style.height = 'auto'
                el.style.position = 'absolute'
                el.style.visibility = 'hidden'
                let h = getComputedStyle(el).height
                el.style.height = 0
                el.style.position = 'static'
                el.style.visibility = 'visible'

                Velocity(el,
                    {height: h.match(/\d+/g).map(Number)[0]},
                    {complete: done, duration: 150}
                )
            },
            leave(el, done) {
                Velocity(el,
                    {height: 0},
                    {complete: done, duration: 150}
                )
            },
        },
        computed: {
            ...mapGetters(['deliveryCost']),
        }
    }
</script>

<style lang="scss" scoped>
    .list-group-item {

        &:active {
            background-color: #f8f9fa;
        }
    }

    .order-body {
        overflow: hidden;
        padding-top: 1rem;
    }

    .button-expand {
        width: 30px;
        height: 24px;
        background: #f1f6ff;
        border-radius: 30px;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .table thead th {
        border: 0;
        padding: 5px 15px;
        opacity: .7;
        font-size: .9em;
    }

    .table td {
        vertical-align: middle;
        padding: 5px 15px;
    }

    .list-group-item.expanded {
        background: #f2f6f9;
    }
    .list-group-item.completed {
        background: #daf1da;
    }

    .table-total {

        td {
            font-size: 1.1em;
            font-weight: bold;
            padding: 5px 10px;
        }
    }

    .order-id {
        width: 35px;
        display: block;
        font-weight: bold;
    }
    .order-price {
        width: 75px;
        color: #dc3545;
        font-weight: bold;
    }
</style>

