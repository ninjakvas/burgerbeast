<template>
    <div>
        <div class="table-responsive">
            <div class="table table-striped table-borderless">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Имя</th>
                    <th scope="col" class="w-100">Адрес</th>
                    <th scope="col">Бонусы</th>
                    <th scope="col">Пол</th>
                    <th scope="col">Email</th>
                    <th scope="col">Телефон</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="u in users.data" :key="u.id">
                    <td>{{u.id}}</td>
                    <td>{{u.name}}</td>
                    <td><span v-if="u.addresses.length">{{u.addresses[0].address}}</span></td>
                    <td>{{u.bonus}}</td>
                    <td>{{u.sex | sex}}</td>
                    <td>{{u.email}}</td>
                    <td>{{u.phone}}</td>
                </tr>
                </tbody>
            </div>
        </div>

        <Pagination :data="users"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Pagination from '@/components/Pagination.vue'

    export default {
        computed: {
            ...mapState({
                users: state => state.admin.users
            }),
        },
        filters: {
            sex: function (value) {
                if (value === 'male') {
                    return 'Мужчина'
                }
                return 'Женщина'
            }
        },

        mounted() {
            let page = this.$route.query.page || 1
            this.$store.dispatch('getUsers', page)
        },
        watch: {
            $route(to) {
                this.$store.dispatch('getUsers', to.query.page);
            }
        },
        components: {
            Pagination
        }
    }
</script>