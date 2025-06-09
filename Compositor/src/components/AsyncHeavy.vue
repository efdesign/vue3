<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';
import { Loading, Error } from '../plugins/components'
const HeavyComponent = defineAsyncComponent({
    // This component is intentionally heavy and complex.
    // It can include multiple nested components, complex logic, and more.
    // Use it wisely to avoid performance issues.
    loader: () => Promise.all([
        import('./Heavy.vue'),
        new Promise(resolve => setTimeout(resolve, 5000)) // 5 seconds delay to simulate a heavy load
    ]).then(([module]) => module), // Return only the module, discard the timeout promise
    loadingComponent: Loading,
    errorComponent: Error,
    delay: 0,
    timeout: 10000,
});
</script>
<template>
    <HeavyComponent />
</template>
<style scoped></style>