<script setup>
const props = defineProps({
    direction: {
        type: String,
        default: 'row',
        validator: (value) => ['row', 'row-reverse', 'column', 'column-reverse'].includes(value)
    },
    wrap: {
        type: String,
        default: 'nowrap',
        validator: (value) => ['nowrap', 'wrap', 'wrap-reverse'].includes(value)
    },
    justifyContent: {
        type: String,
        default: 'flex-start',
        validator: (value) => ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].includes(value)
    },
    alignItems: {
        type: String,
        default: 'stretch',
        validator: (value) => ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'].includes(value)
    },
    alignContent: {
        type: String,
        default: 'stretch',
        validator: (value) => ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch'].includes(value)
    },
    gap: {
        type: String,
        default: '0'
    },
    padding: {
        type: String,
        default: '0'
    },
    margin: {
        type: String,
        default: '0'
    },
    width: {
        type: String,
        default: 'auto'
    },
    height: {
        type: String,
        default: 'auto'
    }
});

// Computed style object
const flexStyle = {
    display: 'flex',
    flexDirection: props.direction,
    flexWrap: props.wrap,
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    alignContent: props.alignContent,
    gap: props.gap,
    padding: props.padding,
    margin: props.margin,
    width: props.width,
    height: props.height
    
};
</script>

<template>
    <div class="flex-container" :style="flexStyle">
        <slot></slot>
    </div>
</template>

<style scoped>
.flex-container {
    /* Base styles - can be overridden by props */
    box-sizing: border-box;
}
</style>