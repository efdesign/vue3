<script setup lang="ts">
/**
 * Icon Component - Flaticon Integration
 * 
 * A Vue 3 component that provides type-safe access to Flaticon icons via CDN.
 * Automatically loads the necessary CSS from Flaticon's CDN and provides
 * TypeScript autocompletion for all available icon names.
 * 
 * @example
 * Basic usage:
 * <Icon name="fi-rr-eye" />
 * 
 * @example
 * With custom size and color:
 * <Icon name="fi-rr-heart" :size="24" color="red" />
 * 
 * @example
 * With number size (converted to px):
 * <Icon name="fi-sr-star" :size="32" />
 * 
 * @example
 * With additional CSS classes:
 * <Icon name="fi-brands-github" className="custom-icon-class" />
 * 
 * Icon naming convention:
 * - fi-rr-* : Regular rounded icons
 * - fi-sr-* : Solid rounded icons  
 * - fi-brands-* : Brand icons
 * - fi-rs-* : Regular straight icons (limited)
 */

import { computed, onMounted } from 'vue'
import type { FlatIconName } from './IconTypes'

interface IconProps {
    name?: FlatIconName
    size?: string | number
    color?: string
    className?: string
}

const props = withDefaults(defineProps<IconProps>(), {
    size: '16px',
    color: 'currentColor'
})

// Load Flaticon CSS if not already loaded
onMounted(() => {
    const existingLink = document.querySelector('link[href*="uicons.flaticon.com"]')
    if (!existingLink) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css'
        document.head.appendChild(link)

        // Also load solid and brands variants
        const linkSolid = document.createElement('link')
        linkSolid.rel = 'stylesheet'
        linkSolid.href = 'https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-rounded/css/uicons-solid-rounded.css'
        document.head.appendChild(linkSolid)

        const linkBrands = document.createElement('link')
        linkBrands.rel = 'stylesheet'
        linkBrands.href = 'https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css'
        document.head.appendChild(linkBrands)
    }
})

// Helper function to convert number or string to CSS dimension value
const getDimensionValue = (value: string | number): string => {
    if (typeof value === 'number') {
        return value === 0 ? '0' : `${value}px`
    }
    return value
}

// Computed class names
const iconClasses = computed(() => {
    const classes = [`fi`, props.name]
    if (props.className) {
        classes.push(props.className)
    }
    return classes.join(' ')
})

// Computed styles
const iconStyles = computed(() => ({
    fontSize: getDimensionValue(props.size),
    color: props.color
}))
</script>

<template>
    <i v-if="props.name" :class="iconClasses" :style="iconStyles" role="img" :aria-label="`Icon: ${name}`"></i>
</template>

<style scoped>
/* Base icon styles */
i {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
}
</style>
