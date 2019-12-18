<template>
    <div>
        <div class="d-flex align-items-center">
            <h2 class="title-1">Редактировать товар:</h2>
            <button class="btn btn-outline-danger btn-sm ml-auto" @click="remove">Удалить</button>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="row">
                <div class="col-md-8 col-lg-9">
                    <div class="form-group">
                        <label for="title" class="form-label">Наименование</label>
                        <input type="text"
                               v-model="product.title"
                               :class="{'is-invalid': errors.title}"
                               placeholder="Наименование товара"
                               class="form-control" id="title">
                        <div class="invalid-feedback" v-if="errors.title">{{errors.title[0]}}</div>
                    </div>
                    <div class="form-group">
                        <label for="subtitle" class="form-label">Подзаголовок</label>
                        <input type="text"
                               v-model="product.subtitle"
                               :class="{'is-invalid': errors.subtitle}"
                               placeholder="Подзаголовок товара"
                               class="form-control" id="subtitle">
                        <div class="invalid-feedback" v-if="errors.subtitle">{{errors.subtitle[0]}}</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Описание товара</label>
                        <ckeditor :editor="editor" v-model="product.body" :config="editorConfig"></ckeditor>
                    </div>
                </div>
                <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label class="form-label">Изображение</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" @change="getImage($event)">
                            <label class="custom-file-label" for="customFile">Картинка</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <img class="product-preview" :src="product.image" alt="">
                    </div>
                    <div class="form-group">
                        <label for="price" class="form-label">Цена</label>
                        <input type="number"
                               v-model="product.price"
                               :class="{'is-invalid': errors.price}"
                               class="form-control" id="price">
                        <div class="invalid-feedback" v-if="errors.price">{{errors.price[0]}}</div>
                    </div>
                    <div class="form-group">
                        <select v-model="product.tag" class="custom-select">
                            <option value="0">Без тега</option>
                            <option v-for="t in tags" :key="t.id" :value="t.id">{{t.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <button class="btn btn-success">Сохранить</button>
        </form>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import CKEditor from '@ckeditor/ckeditor5-vue'
    import {mapState} from 'vuex'
    import {api} from '@/api'

    export default {
        data() {
            return {
                tags: [],
                image: null,
                // ckeditor
                editor: ClassicEditor,
                editorConfig: {},
            }
        },
        mounted() {
            this.$store.dispatch('getProduct', this.$route.params.id)
                .then(() => {
                    api.get('tags?all=1')
                        .then(resp => {
                            this.tags = resp.data
                        })
                })
                .catch(() => this.$router.push('/admin/products'))
        },
        computed: {
            ...mapState({
                errors: state => state.admin.errors,
                product: state => state.admin.product
            }),
        },
        methods: {
            remove() {
                this.$store.commit('setOverlayActive', true)
                this.$toasted.show('Удалить товар?', {
                    duration: null,
                    position: 'top-center',
                    action: [
                        {
                            text: 'Отмена',
                            onClick: (e, toastObject) => {
                                this.$store.commit('setOverlayActive', false)
                                toastObject.goAway(0);
                            }
                        },
                        {
                            text: 'Подтвердить',
                            onClick: (e, toastObject) => {
                                this.$store.dispatch('removeProduct', this.product.id)
                                    .then(() => {
                                        this.$router.go(-1)
                                        this.$store.commit('setOverlayActive', false)
                                        toastObject.goAway(0);
                                    })
                            }
                        }
                    ]
                })
            },
            onSubmit() {
                let data = new FormData();
                data.append('title', this.product.title)
                if (this.product.subtitle) {
                    data.append('subtitle', this.product.subtitle)
                }
                if (this.image) {
                    data.append('image', this.image)
                }
                if (this.product.body) {
                    data.append('body', this.product.body)
                }
                if (this.product.price) {
                    data.append('price', this.product.price)
                }
                data.append('tagId', this.product.tag)
                // php put workaround
                data.append('_method', 'put')
                this.$store.dispatch('updateProduct', {
                    data: data,
                    id: this.product.id
                })
                    .then(() => this.$router.push({name: 'admin-products-list'}))
            },
            getImage(event) {
                this.image = event.target.files[0]
                this.product.image = URL.createObjectURL(this.image)
            }
        },
        components: {
            ckeditor: CKEditor.component
        }
    }
</script>

<style>
    .ck-editor__editable {
        min-height: 300px;
    }
</style>

