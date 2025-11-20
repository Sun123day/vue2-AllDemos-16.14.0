<template>
    <div class="Status-dot">
        <i class="breathe enable" :style="enableStyle" />
        <span class="enable" :style="enableStyle" />
    </div>
</template>
<script>
    export default {
        props: {
            color: String,
        },
        computed: {
            enableStyle() {
                if (this.color) {
                    return {
                        backgroundColor: this.color,
                    }
                } else {
                    return {}
                }
            },
        },
    }
</script>
<style lang="scss" scoped>
    .Status-dot {
        width: 12px;
        height: 12px;
        margin-right: 6px;
        position: relative;
        .enable {
            background-color: #57d0bb;
        }
        & i,
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }
        .breathe {
            -webkit-animation: enable-animation-data-v-1cec71cc 1.5s infinite;
            animation: enable-animation-data-v-1cec71cc 1.5s infinite;
        }
    }

    @-webkit-keyframes enable-animation-data-v-1cec71cc {
        to {
            -webkit-transform: translate(-50%, -50%) scale(3.2);
            transform: translate(-50%, -50%) scale(3.2);
            opacity: 0;
        }
    }
    @keyframes enable-animation-data-v-1cec71cc {
        to {
            -webkit-transform: translate(-50%, -50%) scale(3.2);
            transform: translate(-50%, -50%) scale(3.2);
            opacity: 0;
        }
    }
</style>
