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
    color: #2196f3;
    transition: all .2s ease;
}

.button.primary {
    background: #2196f3;
    color: white;
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
}

.button.solid {
    background: #e3f2fd;
    color: #2196f3;
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