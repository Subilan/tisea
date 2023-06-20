<!-- Copied from https://github.com/nguyenvanduocit/vue-loading-spinner/blob/master/src/components/Circle5.vue -->
<template>
    <div v-bind:style="styles" class="spinner spinner--circle-5"></div>
</template>
<script>
export default {
    props: {
        size: {
            default: '36px'
        }
    },
    computed: {
        styles() {
            return {
                width: this.size,
                height: this.size
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.spinner {
    transform: translate3d(0, 0, 0);
    position: relative;
    background: #00bcd4;
    border-radius: 50%;
    overflow: hidden;
}

.spinner:before,
.spinner:after {
    content: '';
    position: absolute;
    top: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.spinner:before {
    animation: circle-5-spinner 3s infinite;
    transform-origin: 0 50%;
    left: 0;
    background: #b2ebf2;
}

.spinner:after {
    animation: circle-5-spinner 3s 0.2s reverse infinite;
    transform-origin: 100% 50%;
    right: 0;
    background: #e0f7fa;
}

@keyframes circle-5-spinner {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>