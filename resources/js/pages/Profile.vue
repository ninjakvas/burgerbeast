<template>
    <div class="container">
        <h1 class="page-title">Личный кабинет</h1>
        <div class="page-box">
            <div class="profile-nav">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <router-link class="profile-link"
                                     active-class="active"
                                     exact
                                     :to="{name: 'profile'}">Данные пользователя
                        </router-link>
                    </div>
                    <div class="col-auto">
                        <router-link class="profile-link"
                                     active-class="active"
                                     exact
                                     :to="{name: 'profile-orders'}">Мои заказы
                        </router-link>
                    </div>
                    <div class="col-auto ml-auto">
                        <button class="btn btn-danger btn-sm" @click.prevent="logout">
                            <i class="fa fa-sign-out mr-1"></i>Выйти
                        </button>
                    </div>
                </div>
            </div>
            <hr class="m-0">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                this.$store.dispatch('logout').then(() => this.$router.push('/'))
            }
        }
    }
</script>

<style lang="scss">
    .profile-link {
        display: block;
        position: relative;
        padding: 20px 0;
        color: #000;

        &:hover {
            text-decoration: none;
            color: #000;
        }

        &.active {
            &:after {
                opacity: 1;
            }
        }

        &:after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 4px;
            background: #e43a15;
            opacity: 0;
        }
    }
</style>
