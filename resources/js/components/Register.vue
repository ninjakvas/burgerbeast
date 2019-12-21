<template>
    <div class="auth-modal">
        <div class="auth-modal__title">Регистрация</div>
        <form @submit.prevent="submit(phone, name, password)">
            <div class="form-group">
                <label class="form-label"><i class="fa fa-phone mr-2"></i>Ваш телефон</label>
                <imask v-model="phone" :mask="mask" :lazy="true" type="text"
                       :class="{'is-invalid': errors.phone}"
                       class="form-control form-control-lg"/>
                <div class="invalid-feedback" v-if="errors.phone">{{errors.phone[0]}}</div>
            </div>
            <div class="form-group">
                <label for="name" class="form-label"><i class="fa fa-user-circle-o mr-2"></i>Ваше имя</label>
                <input id="name" v-model="name" type="text"
                       :class="{'is-invalid': errors.name}"
                       class="form-control form-control-lg">
                <div class="invalid-feedback" v-if="errors.name">{{errors.name[0]}}</div>
            </div>
            <div class="form-group">
                <label for="password" class="form-label"><i class="fa fa-lock mr-2"></i>Ваш пароль</label>
                <input id="password" v-model="password" type="password"
                       :class="{'is-invalid': errors.password}"
                       class="form-control form-control-lg">
                <div class="invalid-feedback" v-if="errors.password">{{errors.password[0]}}</div>
            </div>
            <div class="form-group mt-4">
                <button class="btn btn-secondary w-100 btn-lg"><i class="fa fa-check mr-2"></i>Регистрация</button>
            </div>
            <div class="text-small text-center">
                Уже есть аккаунт?
                <router-link to="#login">Войти</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {IMaskComponent} from 'vue-imask'

    export default {
        data() {
            return {
                mask: '{+38} ({\\0}00) 000 00 00',
                phone: '',
                name: '',
                password: ''
            }
        },
        computed: {
            ...mapState({
                errors: state => state.user.errors
            })
        },
        methods: {
            submit(phone, name, password) {
                this.$store.dispatch('auth', {
                    reg: true,
                    form: {phone, name, password}
                })
                    .then(() => this.$router.push({name: 'profile'}))
            }
        },
        components: {
            imask: IMaskComponent
        }
    }
</script>
