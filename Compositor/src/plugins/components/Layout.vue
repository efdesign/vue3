<script setup lang='ts'>
import Flex from './Flex.vue';


</script>
<template>

    <Flex direction="row" alignItems="stretch" justifyContent="flex-start" gap="10px" padding="0">
        <slot name="tools">tools</slot>
        <slot name="composition">composition</slot>
        <slot name="panels">panels</slot>
    </Flex>

</template>
<style scoped></style>
