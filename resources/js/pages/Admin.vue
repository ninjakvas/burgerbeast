<template>
    <div class="container-fluid">
        <div class="overlay-spinner" v-if="overlayActive"></div>
        <button class="btn btn-info my-2 d-xl-none" @click="active = !active">Меню</button>
        <div class="row admin-container" :class="{active: active}">
            <div class="col-auto admin-nav">
                <div class="admin-nav-item">
                    <router-link class="btn btn-success w-100" :to="{name: 'admin-products-create'}">
                        <i class="fa fa-plus mr-2"></i>Добавить товар
                    </router-link>
                </div>
                <router-link :to="{name: 'admin-home'}"
                             active-class="active"
                             exact
                             class="admin-nav-item">
                    <i class="fa fa-tachometer mr-2"></i> Главная
                </router-link>
                <router-link :to="{name: 'admin-products-list'}"
                             active-class="active"
                             exact
                             class="admin-nav-item">
                    <i class="fa fa-th-list mr-2"></i> Товары
                </router-link>
                <router-link :to="{name: 'admin-tags'}"
                             active-class="active"
                             exact
                             class="admin-nav-item">
                    <i class="fa fa-tag mr-2"></i> Теги
                </router-link>
                <router-link :to="{name: 'admin-orders'}"
                             active-class="active"
                             exact
                             class="admin-nav-item">
                    <i class="fa fa-shopping-cart mr-2"></i> Заказы
                    <span v-if="user.notifications.length"
                          class="badge badge-danger badge-pill float-right">{{user.notifications.length}}</span>
                </router-link>
                <router-link :to="{name: 'admin-users'}"
                             active-class="active"
                             exact
                             class="admin-nav-item">
                    <i class="fa fa-user mr-2"></i> Пользователи
                </router-link>
                <router-link :to="{name: 'home'}"
                             active-class="active"
                             exact
                             class="admin-nav-item">
                    <i class="fa fa-home mr-2"></i> На сайт
                </router-link>
            </div>
            <div class="col admin-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                active: false
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                overlayActive: state => state.admin.overlayActive
            })
        },
    }
</script>

<style scoped>
    .badge {
        margin-top: 3px;
    }
    .overlay-spinner {
        position: fixed;
    }
</style>
