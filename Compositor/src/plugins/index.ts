import type { App } from 'vue'
import { ComponentsPlugin } from './components'

// Main plugin that bundles all plugins
export const CompositorPlugin = {
  install(app: App) {
    app.use(ComponentsPlugin)
  }
}

// Export individual plugins for selective installation
export { ComponentsPlugin }

// Export composables for direct import
export { useMouseCoordinates } from './composables'

// Export all plugins as default
export default CompositorPlugin
