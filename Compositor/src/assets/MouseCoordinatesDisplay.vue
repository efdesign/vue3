<script setup lang='ts'>
import { useMouseCoordinates } from '@/components/composables/useMouseCoordinates';
const { mouseX, mouseY } = useMouseCoordinates();
</script>
<template>
    <div class="mouse-coordinates">
        <p>X: {{ mouseX }}</p>
        <p>Y: {{ mouseY }}</p>
    </div>
</template>
<style scoped></style>