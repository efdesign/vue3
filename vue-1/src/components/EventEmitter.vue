<script setup>
defineEmits(['redEvent'])
</script>
<template>
    <button @click="$emit('redEvent')">
        Click me to send a red event
    </button>
</template>
<style scoped></style>