<template>
    <footer id="footer" v-if="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <h6 class="text-white-50">Навигация:</h6>
                    <div class="d-flex flex-column">
                        <a href="#" class="mb-1">Главная</a>
                        <a href="#" class="mb-1">Меню</a>
                        <a href="#" class="mb-1">Доставка</a>
                        <router-link to="/about">О нас</router-link>
                    </div>
                </div>
                <div class="col-md-3">
                    <h6 class="text-white-50">Оформить заказ:</h6>
                    <div class="d-flex flex-column">
                        <a href="#" class="mb-1">+38 (063) 980 11 00</a>
                        <a href="#" class="mb-1">+38 (063) 980 11 00</a>
                        <a href="#" class="mb-1">+38 (063) 980 11 00</a>
                    </div>
                </div>
                <div class="col-md-3">
                    <h6 class="text-white-50">Время работы:</h6>
                    с 11:00 до 22:45
                </div>
                <div class="col-md-3">
                    <h6 class="text-white-50">Мы в соц.сетях</h6>
                    <div class="d-flex social">
                        <a href="#" class="p-2"><i class="fa fa-facebook"></i></a>
                        <a href="#" class="p-2"><i class="fa fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                footer: true
            }
        },
        watch: {
            $route(to) {
                if (to.path.indexOf('admin') !== -1) {
                    this.footer = false
                } else {
                    this.footer = true
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    #footer {
        padding: 80px 0 60px;
        background: linear-gradient(transparent, rgba(0, 0, 0, .7));
        color: #fff;

        a {
            color: #fff;
        }
    }
    .social {
        font-size: 1.4em;
    }
</style>
