<script setup lang='ts'>
import { useMouseCoordinates } from '@/plugins/index';
const { mouseX, mouseY } = useMouseCoordinates();
</script>
<template>
    <div class="mouse-coordinates">
        <p>X: {{ mouseX }}</p>
        <p>Y: {{ mouseY }}</p>
    </div>
</template>
<style scoped></style>