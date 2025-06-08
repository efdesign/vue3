<script setup lang='ts'>
import type { FlatIconName } from '../IconTypes';

import PanelHeader from './PanelHeader.vue';
import PanelBody from './PanelBody.vue';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    icon?: FlatIconName;
    title?: string;
    subtitle?: string;
    isOpen?: boolean;

}>(), {
    icon: 'fi-brands-github',
    title: 'Panel Title',
    subtitle: '',
    isOpen: true,

});

const isOpen = ref(props.isOpen)

const toggle = () => {
    isOpen.value = !isOpen.value;
};

</script>
<template>

    <div class="panel">
        <PanelHeader :icon="'fi-brands-amazon'" :open="isOpen" :toggle="toggle">
            <h1 v-if="props.title" class="title">{{ props.title }}
                <span v-if="props.subtitle" class="subtitle">{{
                    props.subtitle }}</span>
            </h1>
        </PanelHeader>
        <hr>
        <PanelBody v-if="isOpen">
            <slot></slot>
        </PanelBody>
    </div>
</template>
<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.title {
    font-size: 1.2lh;
    line-height: 1.2lh;
    font-weight: bold;
    margin: 0;
    flex: 1;

    .subtitle {
        font-size: 0.5lh;
        line-height: 0.7lh;
        color: #666;
        display: block;
        margin-top: 0lh
    }
}
</style>
