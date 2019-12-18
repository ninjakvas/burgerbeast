<template>
    <div class="dd-hover" :class="{active: show}" @click="show = !show">
        <div class="dd-hover__value text-white">
            <i class="fa fa-user-circle-o mr-2"></i>{{user.name}} <i class="fa fa-caret-down"></i>
        </div>
        <div class="dd-hover__content">
            <router-link class="dd-hover__item" :to="{name: 'profile'}">Профиль</router-link>
            <router-link class="dd-hover__item" :to="{name: 'profile-orders'}">Мои заказы</router-link>
            <button class="dd-hover__item" @click="logout">Выход</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['user'],
        data() {
            return {
                show: false
            }
        },
        created() {
            let self = this
            window.addEventListener('click', (e) => {
                if (!self.$el.contains(e.target)) {
                    self.show = false
                }
            })
        },
        methods: {
            logout() {
                this.$store.dispatch('logout').then(() => this.$router.push('/'))
            }
        },
    }
</script>