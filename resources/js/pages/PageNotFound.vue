<template>
    <div class="container">
        <div class="page-404">
            <div class="page-404-code">404</div>
            <div class="page-404-message">Страница не найдена</div>
            <router-link class="text-white" to="/"><i class="fa fa-home mr-2"></i>На главную</router-link>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss">
    .page-404 {
        padding-top: 5%;
        color: #fff;
        text-align: center;
    }

    .page-404-code {
        font-size: 8em;
        line-height: 1;
        font-weight: bold;
    }

    .page-404-message {
        font-size: 1.4em;
    }
</style>