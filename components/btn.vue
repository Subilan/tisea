<template>
    <div class="button">
        <slot></slot>
    </div>
</template>

<style>
.button {
    padding: 8px 16px;
    border: 1px solid rgba(0, 0, 0, .2);
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
    background: white;
    color: #00bcd4;
    transition: all .2s ease;
}

.button.primary {
    background: #00bcd4;
    color: white;
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
}

.button.solid {
    background: #e0f7fa;
    color: #00bcd4;
    border: none;
}

.button[disabled] {
    cursor: not-allowed;
    box-shadow: none;
    border: none;
    background: gray;
    color: white;
}

.button:hover {
    opacity: .8;
    
}
</style>