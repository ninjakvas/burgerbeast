<template>
    <div class="box-padding mb-5">
        <div class="overlay-spinner" v-if="!user">
            <div class="lds-dual-ring"></div>
        </div>
        <div class="d-flex align-items-center mb-4">
            <h2 class="title-1 m-0">Данные пользователя:</h2>
            <div class="ml-auto">
                <b>Бонусы:</b> <span
                    :class="{'badge-danger': !user.bonus, 'badge-success': user.bonus}"
                    class="badge badge-pill">{{user.bonus}}</span>
            </div>
        </div>
        <form @submit.prevent="update">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name" class="form-label">Имя:</label>
                        <input type="text" v-model="user.name"
                               :class="{'is-invalid': errors.name}"
                               placeholder="Ваше имя"
                               class="form-control form-control-lg" id="name">
                        <div class="invalid-feedback" v-if="errors.name">{{errors.name[0]}}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="phone" class="form-label">Телефон:</label>
                        <input type="text" v-model="user.phone"
                               :class="{'is-invalid': errors.phone}"
                               class="form-control form-control-lg" id="phone">
                        <div class="invalid-feedback" v-if="errors.phone">{{errors.phone[0]}}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" v-model="user.email"
                               :class="{'is-invalid': errors.email}"
                               class="form-control form-control-lg" id="email">
                        <div class="invalid-feedback" v-if="errors.email">{{errors.email[0]}}</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="sex" class="form-label">Пол:</label>
                        <select id="sex" v-model="user.sex" class="custom-select custom-select-lg">
                            <option value="male">Мужчина</option>
                            <option value="female">Женщина</option>
                        </select>
                    </div>
                </div>
            </div>
            <button class="btn btn-info mt-4">Сохранить изменения</button>
        </form>
        <hr class="my-4">
        <h2 class="title-1">Адреса доставки:</h2>
        <div v-if="!user.addresses">Загрузка...</div>
        <ul v-else-if="user.addresses.length" class="list-group font-weight-bold profile-addresses">
            <li class="list-group-item list-group-item-light" v-for="a in user.addresses" :key="a.id">
                <i class="fa fa-home mr-2"></i>{{a.address}}
                <button @click="deleteAddress(a.id)" type="button" class="close mt-1" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
        </ul>
        <p class="my-4" v-else>У вас пока нет адреса доставки</p>
        <hr>
        <form @submit.prevent="addAddress(address)">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label for="street" class="form-label">Улица</label>
                        <input id="street" type="text"
                               v-model="address"
                               class="form-control form-control-lg" autocomplete="off">
                    </div>
                </div>
            </div>
            <button class="btn btn-info"><i class="fa fa-plus"></i> Добавить адрес</button>
        </form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                address: '',
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                errors: state => state.user.errors,
            })
        },
        methods: {
            deleteAddress(id) {
                this.$store.dispatch('deleteAddress', id)
                    .catch(err => {
                        this.$toasted.error(err.message)
                    })
            },
            addAddress(address) {
                this.$store.dispatch('storeAddress', {address})
                this.address = ''
            },
            update() {
                this.$store.dispatch('update', this.user)
                    .then(() => this.$toasted.success('Изменения сохранились!'))
            }
        },
    }
</script>
