<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

// Define types for CSS Grid properties
type JustifyItems = 'start' | 'end' | 'center' | 'stretch'
type AlignItems = 'start' | 'end' | 'center' | 'stretch' | 'baseline'
type JustifyContent = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
type AlignContent = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'

interface GridProps {
    // Grid structure
    rows?: number | string
    columns?: number | string

    // Alignment within grid cells (main and cross axis for individual items)
    justifyItems?: JustifyItems  // main axis alignment for items
    alignItems?: AlignItems      // cross axis alignment for items

    // Alignment of the entire grid (when grid is smaller than container)
    justifyContent?: JustifyContent  // main axis alignment for the grid
    alignContent?: AlignContent      // cross axis alignment for the grid

    // Spacing and sizing - accept both string and number
    gap?: string | number
    rowGap?: string | number
    columnGap?: string | number
    width?: string | number
    height?: string | number
    padding?: string | number
    margin?: string | number
}

const props = withDefaults(defineProps<GridProps>(), {
    rows: 'auto',
    columns: 'auto',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'start',
    alignContent: 'start',
    gap: 0,
    width: 'auto',
    height: 'auto',
    padding: 0,
    margin: 0
})

// Helper function to convert number or string to grid template
const getGridTemplate = (value: number | string): string => {
    if (typeof value === 'number') {
        return `repeat(${value}, 1fr)`
    }
    return value
}

// Helper function to convert number or string to CSS dimension value
const getDimensionValue = (value: string | number): string => {
    if (typeof value === 'number') {
        return value === 0 ? '0' : `${value}px`
    }
    return value
}

// Computed style object with proper typing
const gridStyle = computed((): CSSProperties => {
    const style: CSSProperties = {
        display: 'grid',
        gridTemplateRows: getGridTemplate(props.rows),
        gridTemplateColumns: getGridTemplate(props.columns),
        justifyItems: props.justifyItems,
        alignItems: props.alignItems,
        justifyContent: props.justifyContent,
        alignContent: props.alignContent,
        width: getDimensionValue(props.width),
        height: getDimensionValue(props.height),
        padding: getDimensionValue(props.padding),
        margin: getDimensionValue(props.margin)
    }

    // Handle gap properties - use specific gaps if provided, otherwise use general gap
    if (props.rowGap !== undefined || props.columnGap !== undefined) {
        if (props.rowGap !== undefined) style.rowGap = getDimensionValue(props.rowGap)
        if (props.columnGap !== undefined) style.columnGap = getDimensionValue(props.columnGap)
    } else {
        style.gap = getDimensionValue(props.gap)
    }

    return style
})
</script>

<template>
    <div class="grid-container" :style="gridStyle">
        <slot></slot>
    </div>
</template>

<style scoped>
.grid-container {
    /* Base styles - can be overridden by props */
    box-sizing: border-box;
}
</style>
