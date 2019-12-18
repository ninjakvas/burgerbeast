<template>
    <div v-if="!data">Загрузка...</div>
    <nav v-else-if="data.last_page > 1" class="mt-4">
        <ul class="pagination justify-content-center">
            <li class="page-item" v-if="data.prev_page_url">
                <button class="page-link" @click="goToPage(data.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </button>
            </li>
            <li v-for="n in pagesCount" class="page-item" :class="{active: n === data.current_page}">
                <button class="page-link" @click="goToPage(n)">{{n}}</button>
            </li>
            <li class="page-item" v-if="data.next_page_url">
                <button class="page-link" @click="goToPage(data.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {
                offset: 2
            }
        },
        methods: {
            goToPage(page) {
                this.$router.push({
                    query: {...this.$route.query, page}
                })
            },
        },
        computed: {
            pagesCount() {
                if (!this.data.to) {
                    return [];
                }
                let from = this.data.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.offset * 2);
                if (to >= this.data.last_page) {
                    to = this.data.last_page;
                }
                let pagesArray = [];
                for (let page = from; page <= to; page++) {
                    pagesArray.push(page);
                }
                return pagesArray;
            }
        }
    }
</script>
