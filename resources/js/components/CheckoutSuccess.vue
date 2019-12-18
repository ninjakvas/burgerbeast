<template>
    <div class="page-box box-padding order-complete text-center py-5">
        <div class="h2 text-success">
            <i class="fa fa-check-circle mr-2"></i>Спасибо! Ваш заказ отправлен в обработку.
        </div>
        <p>Вы можете отслеживать ваши заказы на странице
            <router-link class="text-danger" :to="{name: 'profile-orders'}">ваших заказов</router-link>
        </p>
        <p v-if="user.token">Пароль от вашего аккаунта отправлен на указанную почту <span
                class="text-info">{{user.email}}</span></p>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters(['user'])
        },
    }
</script>