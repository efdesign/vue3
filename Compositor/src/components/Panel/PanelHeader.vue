<script setup lang='ts'>
import Flex from '../Flex.vue';
import Icon from '../Icon.vue';
import type { FlatIconName } from '../IconTypes';
import { useAppConfig } from '../useAppConfig';

const props = defineProps<{
    title?: string;
    subtitle?: string;
    icon?: FlatIconName;
    toggle?: () => void;
    open?: boolean;
}>();

const config = useAppConfig();
</script>
<template>
    <Flex direction="row-reverse" alignItems="center" justifyContent="flex-start" gap="10px" padding="5px"
        @click="props.toggle">
        <Icon v-if="open" name="fi-sr-arrow-up" :size="config.iconSize" :color="config.iconColor" />
        <Icon v-else name="fi-sr-arrow-down" :size="config.iconSize" :color="config.iconColor" />
        <slot></slot>
    </Flex>
</template>
<style scoped></style>
