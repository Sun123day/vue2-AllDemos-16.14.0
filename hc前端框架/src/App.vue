<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import settings from './settings'
    export default {
        name: 'App',
        mounted() {
            document.title = settings.title
        },
    }
</script>
<style lang="scss" scoped>
    #app {
        height: 100%;
        width: 100%;
    }
</style>
