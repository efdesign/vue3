<script setup lang='ts'>
// Icon component is now globally available through the plugin system
// useAppConfig is imported from the main plugins folder
import { useAppConfig } from '../useAppConfig';
const config = useAppConfig();
// https://www.svgbackgrounds.com/elements/animated-svg-preloaders/
</script>
<template>
    <div class="loading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
            <path fill="none" stroke="#369F61" stroke-width="5" stroke-linecap="round" stroke-dasharray="300 385"
                stroke-dashoffset="0"
                d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
                <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685"
                    keySplines="0 0 1 1" repeatCount="indefinite"></animate>
            </path>
        </svg>

    </div>
</template>
<style scoped>
.loading {
    transform: scale(0.5)
}
</style>