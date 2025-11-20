<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="keepAliveViews">
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: 'AppMain',
        computed: {
            ...mapState({
                // keepAliveViews: (state) => state.keepAliveComponents,
                keepAliveViews: (state) => {
                    // console.log('22222keepAliveViews', state.keepAliveComponents);
                    return state.keepAliveComponents
                }
            }),
            key() {
                // console.log('app-main key', this.$route.path);
                return this.$route.path
            },
        },
    }
</script>

<style lang="scss" scoped>
    .app-main {
        /* 56= navbar  56  */
        flex-grow: 1;

        position: relative;
        height: 100%;
        // overflow: hidden;
    }
</style>
