<template>
    <div class="card">
        <div class="card-title">
            <slot name="title"></slot>

        </div>
        <div class="card-content">
            <slot name="content"></slot>
        </div>
        <div class="card-actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.card {
    padding: 16px;
    background: white;
    border: 1px solid rgba(0, 0, 0, .21);
    border-radius: 5px;
}

.card-title {
    font-size: 20px;
    margin-bottom: 16px;
}

.card-content {
    font-size: 18px;
    line-height: 1.5;
}

.card-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
}
</style>