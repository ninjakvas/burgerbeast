<template>
    <div class="position-relative h-100">
        <div class="row mb-4">
            <div class="col-md-6 m-auto">
                <form @submit.prevent="create">
                    <div class="input-group input-group-lg">
                        <input type="text" class="form-control" v-model="name" placeholder="Название тега">
                        <div class="input-group-append">
                            <button class="btn btn-success">Создать</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="!tags.data" class="overlay-spinner">
            <div class="lds-dual-ring"></div>
        </div>

        <div v-else-if="tags.data.length" class="table-responsive">
            <div class="table table-striped table-borderless">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col" class="w-25">Имя</th>
                    <th scope="col" class="w-75">Slug</th>
                    <th scope="col" class="text-nowrap">Главное меню</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>
                <tbody>
                <admin-tags-item v-for="tag in tags.data" :key="tag.id" :tag="tag"/>
                </tbody>
            </div>
        </div>
        <div v-else>Нет тегов</div>

        <Pagination :data="tags"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Pagination from '@/components/Pagination.vue'
    import AdminTagsItem from '@/components/AdminTagsItem.vue'

    export default {
        data() {
            return {
                name: ''
            }
        },
        methods: {
            create() {
                this.$store.dispatch('createTag', {name: this.name})
                    .then(_ => this.name = '')
            }
        },
        computed: {
            ...mapState({
                tags: state => state.admin.tags
            })
        },
        components: {
            AdminTagsItem,
            Pagination
        },
        mounted() {
            let page = this.$route.query.page || 1
            this.$store.dispatch('getTags', page)
        },
        watch: {
            $route(to, from) {
                this.$store.dispatch('getTags', to.query.page);
            }
        },
    }
</script>