<template>
    <div class="auth">
        Auth
    </div>
</template>

<script setup>
onMounted(() => {
    $fetch('/api/c', {
        method: 'get'
    }).then((r, j) => {
        console.log(r, j)
    })
})
</script>