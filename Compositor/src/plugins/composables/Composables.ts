import type { App } from 'vue'
import { useMouseCoordinates } from './useMouseCoordinates'

// Composables Plugin - makes composables available globally on the app instance
export const ComposablesPlugin = {
  install(app: App) {
    // Make composables available globally via app.config.globalProperties
    app.config.globalProperties.$useMouseCoordinates = useMouseCoordinates
    
    // Provide composables for injection
    app.provide('useMouseCoordinates', useMouseCoordinates)
  }
}

// Export individual composables for direct import
export { useMouseCoordinates }

export default ComposablesPlugin
