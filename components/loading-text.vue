<template>
    <div class="loading-text" :class="{ center: this.center }" :style="{ margin: `${this.margin} 0` }">
        <spinner size="20px" width="0.3px" />
        {{ text }}
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '加载中...'
        },
        center: {
            type: Boolean,
            default: false
        },
        margin: {
            type: String,
            default: '8px'
        }
    }
}
</script>

<style scoped>
.loading-text {
    text-align: center;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
}

.loading-text.center {
    display: flex;
    justify-content: center;
}
</style>