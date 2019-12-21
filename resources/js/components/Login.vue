<template>
    <div class="auth-modal">
        <div class="auth-modal__title">Авторизация</div>
        <form @submit.prevent="submit(phone, password)">
            <p class="text-danger" v-if="errors.message">{{errors.message}}</p>
            <div class="form-group">
                <label class="form-label"><i class="fa fa-phone mr-2"></i>Ваш телефон</label>
                <imask v-model="phone" :unmask="true" :mask="mask" :lazy="true" autofocus type="text"
                       :class="{'is-invalid': errors.phone}"
                       class="form-control form-control-lg"/>
                <div class="invalid-feedback" v-if="errors.phone">{{errors.phone[0]}}</div>
            </div>
            <div class="form-group">
                <label for="password" class="form-label"><i class="fa fa-lock mr-2"></i>Ваш пароль</label>
                <input id="password" v-model="password" type="password"
                       :class="{'is-invalid': errors.password}"
                       class="form-control form-control-lg">
                <div class="invalid-feedback" v-if="errors.password">{{errors.password[0]}}</div>
            </div>
            <div class="form-group mt-4">
                <button class="btn btn-secondary w-100 btn-lg"><i class="fa fa-sign-in mr-2"></i>Войти</button>
            </div>
            <div class="text-small text-center">
                Еще нет аккаунта?
                <router-link to="#register">Зарегистрироваться</router-link>
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
                password: ''
            }
        },
        computed: {
            ...mapState({
                errors: state => state.user.errors
            })
        },
        methods: {
            submit(phone, password) {
                this.$store.dispatch('auth', {
                    reg: false,
                    form: {phone, password}
                })
                    .then(() => this.$router.push(this.$route.path))
            }
        },
        components: {
            imask: IMaskComponent
        }
    }
</script>

<style lang="scss">
    .auth-modal {
        max-width: 350px;
        margin: auto;

        &__title {
            text-transform: uppercase;
            font-size: 1.1em;
            text-align: center;
            margin-bottom: 1em;
            font-weight: bold;
            opacity: .7;
        }
    }

    .form-label {
        opacity: .8;
        font-weight: bold;
        font-size: .8em;
        text-transform: uppercase;
    }

    .text-small {
        font-size: .8em;
    }
</style>
