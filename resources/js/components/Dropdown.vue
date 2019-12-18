<template>
    <div class="dropdown">
        <div class="dropdown__current text-white" @click="open">{{current}}</div>
        <div class="dropdown__list" v-if="show">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['current', 'show'],
        methods: {
            open() {
                this.$emit('open')
            }
        },
    }
</script>

<style lang="scss">
    .dropdown {
        position: relative;

        &__current {
            cursor: pointer;
            padding: 5px 30px 5px 10px;
            background: #da3a17;
            border-radius: 3px;

            &:after {
                content: '';
                position: absolute;
                right: 10px;
                top: calc(50% - 3px);
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 6px 5px 0 5px;
                border-color: white transparent transparent transparent;
            }
        }
        &__list {
            position: absolute;
            top: 100%;
            right: 0;
            background: #fff;
            z-index: 99;
            width: 100%;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;

            button {
                text-align: right;
                padding: 8px 16px;
                width: 100%;

                &:hover {
                    background: #f1f6ff;
                }
            }
        }
    }
</style>