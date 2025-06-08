<script setup lang='ts'>
import { inject } from 'vue'
import Flex from '../Flex.vue';
import Icon from '../Icon.vue';
import type { FlatIconName } from '../IconTypes';
import type { AppConfig } from '../../AppConfig';

const props = defineProps<{
    title?: string;
    subtitle?: string;
    icon?: FlatIconName;
    toggle?: () => void;
    open?: boolean;
}>();

const config = inject(configKey);


</script>
<template>
    <Flex direction="row-reverse" alignItems="center" justifyContent="flex-start" gap="10px" padding="5px"
        @click="props.toggle">
        <Icon v-if="open" name="fi-sr-arrow-up" :size="config." color="#666" />
        <Icon v-else name="fi-sr-arrow-down" :size="16" color="#666" />
        <slot></slot>
    </Flex>
</template>
<style scoped></style>
