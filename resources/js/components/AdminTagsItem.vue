<template>
    <tr>
        <td>{{tag.id}}</td>
        <td>
            <div class="text-nowrap" v-if="!editMode" @click="editMode = !editMode">{{tag.name}}</div>
            <form v-else @submit.prevent="save">
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control" v-model="tag.name">
                    <div class="input-group-append">
                        <button class="btn btn-info"><i class="fa fa-check"></i></button>
                    </div>
                </div>
            </form>
        </td>
        <td>{{tag.slug}}</td>
        <td>
            <div class="form-check">
                <input @change="save" v-model="tag.nav" class="form-check-input" type="checkbox" :id="'check-' + tag.id">
                <label class="form-check-label text-nowrap" :for="'check-'+ tag.id">
                    Главное меню
                </label>
            </div>
        </td>
        <td>
            <button class="btn btn-danger btn-sm" @click="remove"><i class="fa fa-times"></i></button>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            tag: {
                type: Object,
                default: null
            },
        },
        data() {
            return {
                editMode: false
            }
        },
        methods: {
            save() {
                const {id, name, nav} = this.tag
                this.$store.dispatch('updateTag', {id, payload: {name, nav}})
                    .then(() => this.editMode = false)
            },
            remove() {
                this.$store.dispatch('removeTag', this.tag.id)
            }
        },
    }
</script>