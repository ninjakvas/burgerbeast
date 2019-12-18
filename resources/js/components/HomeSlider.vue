<template>
    <div class="home-slider">
        <agile :options="options" ref="slider">
            <div class="slide"><img class="w-100" src="http://via.placeholder.com/1400x550" alt=""></div>
        </agile>
        <div class="home-slider__buttons">
            <button class="home-slider__prev" @click="$refs.slider.goToPrev()"><i class="fa fa-angle-left"></i></button>
            <button class="home-slider__next" @click="$refs.slider.goToNext()"><i class="fa fa-angle-right"></i></button>
        </div>
    </div>
</template>

<script>
    import {VueAgile} from 'vue-agile'

    export default {
        data() {
            return {
                options: {
                    navButtons: false
                }
            }
        },
        components: {
            agile: VueAgile
        }
    }
</script>
