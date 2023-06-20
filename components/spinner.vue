<!-- Copied from https://github.com/nguyenvanduocit/vue-loading-spinner/blob/master/src/components/Circle2.vue ; Modified -->
<template>
    <div :style="styles" class="spinner spinner--circle-2"></div>
</template>
<script>
export default {
    props: {
        size: {
            default: '40px'
        },
        background: {
            default: '#e0f7fa'
        },
        color: {
            default: '#00bcd4'
        },
        stroke: {
            default: '3px'
        }
    },
    computed: {
        styles() {
            return {
                width: this.size,
                height: this.size,
                border: this.stroke + ' solid ' + this.background,
                borderTopColor: this.color
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.spinner {
    box-sizing: border-box;
    border-radius: 100%;
    border: 10px solid rgba(255, 255, 255, 0.2);
    animation: circle-2-spin 1s infinite linear;
}

@keyframes circle-2-spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>