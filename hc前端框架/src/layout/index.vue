<script>
    import { AppMain, Navbar, Sidebar, TagsView, PaHeader } from './components'
    import { mapState } from 'vuex'
    export default {
        components: {
            PaHeader,
            Sidebar,
            Navbar,
            AppMain,
        },
        computed: {
            ...mapState({
                device: (state) => state.device,
                withoutAnimation: (state) => state.sidebar.withoutAnimation,
                opened: (state) => state.sidebar.opened,
                needTagsView: (state) => state.settings.tagsView,
                fixedHeader: (state) => state.settings.fixedHeader,
            }),
            classObj() {
                return {
                    hideSidebar: !this.opened,
                    openSidebar: this.opened,
                    withoutAnimation: this.withoutAnimation,
                    mobile: this.device === 'mobile',
                }
            },
        },
    }
</script>
<template>
    <div :class="classObj" class="app-wrapper">
        <PaHeader />
        <sidebar class="sidebar-container" />
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <Navbar />
            </div>
            <div style="flex-grow: 1;overflow: auto; padding: 0 16px;display:flex;flex-direction: column">
                <app-main />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        background: $page-bg-color;
        overflow: hidden;
        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
        display: flex;
    }
    .main-container {
        margin-top: $header-height;
        height: calc(100vh - #{$header-height});
        overflow: hidden;
        transition: margin-left 0.28s;
        position: relative;
        flex: 1;
        
        display: flex;
        flex-direction: column;
    }
    .sidebar-container {
        height: calc(100vh - #{$header-height});
        width: $sideBarWidth;
        margin-top: $header-height;
        position: relative;
    }
</style>
