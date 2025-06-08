<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

// Define types for the props
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'

interface FlexProps {
    direction?: FlexDirection
    wrap?: FlexWrap
    justifyContent?: JustifyContent
    alignItems?: AlignItems
    alignContent?: AlignContent
    gap?: string
    padding?: string
    margin?: string
    width?: string
    height?: string
}

const props = withDefaults(defineProps<FlexProps>(), {
    direction: 'row',
    wrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    gap: '0',
    padding: '0',
    margin: '0',
    width: 'auto',
    height: 'auto'
})

// Computed style object with proper typing
const flexStyle = computed((): CSSProperties => ({
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
}))
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