<template>
    <vodal :show="show" animation="zoom" @hide="close">
        <Login v-if="$route.hash === '#login'"/>
        <Register v-if="$route.hash === '#register'"/>
    </vodal>
</template>

<script>
    import {mapState} from 'vuex'
    import Vodal from 'vodal'
    import Login from '@/components/Login.vue'
    import Register from '@/components/Register.vue'
    import 'vodal/common.css'
    import 'vodal/zoom.css'

    export default {
        computed: {
            ...mapState({
                isAuth: state => state.user.isAuth
            }),
            show() {
                if (this.isAuth) {
                    return false
                }
                let hash = this.$route.hash
                return hash === '#login' || hash === '#register'
            }
        },
        methods: {
            close() {
                const path = this.$route.path
                this.$router.push(path)
            }
        },
        components: {
            Login,
            Register,
            Vodal,
        },
    }
</script>

<style lang="scss">
    .app-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 2;
    }

    .app-modal-wrap {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999;
        left: 0;
        bottom: 0;
        display: flex;
        padding: 15px;
    }

    .app-modal {
        position: relative;
        z-index: 5;
        padding: 40px 25px 25px;
        margin: auto;
        background: #fff;
        width: 100%;
        max-width: 500px;
        box-shadow: 0 0 20px rgba(0, 0, 0, .2)
    }

    .app-modal-close {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        opacity: .6;
        font-size: 1.2em;
    }

    .vodal {
        display: flex;
    }

    .vodal-dialog {
        height: auto !important;
        min-height: 350px;
        position: relative;
        margin: auto;
    }
</style>
