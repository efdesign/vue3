import { createApp } from 'vue'
import App from '../App.vue'

// ========================================
// Different ways to use the Compositor plugins
// ========================================

// Method 1: Install all components at once (Recommended)
import CompositorPlugin from './index'

const app1 = createApp(App)
app1.use(CompositorPlugin)
// Now all components are globally available:
// Panel, Flex, Grid, Icon, Layout, Loading, Error, Badge, CustomDirective

// ========================================

// Method 2: Install only the components plugin
import { ComponentsPlugin } from './index'

const app2 = createApp(App)
app2.use(ComponentsPlugin) // All components globally registered

// ========================================

// Method 3: Import components and composables directly (without global registration)
import { 
  Panel, 
  Flex, 
  Grid, 
  Icon, 
  Layout, 
  Loading, 
  Error, 
  Badge, 
  CustomDirective 
} from './components'

import { useMouseCoordinates } from './composables'

// Use them in your component's setup function:
export default {
  components: {
    Panel,
    Flex,
    Grid,
    Icon,
    Layout,
    Loading,
    Error,
    Badge,
    CustomDirective
  },
  setup() {
    // Use composables directly
    const mousePos = useMouseCoordinates()
    
    return {
      mousePos
    }
  }
}

// ========================================
// Type exports
// ========================================

// Import types for use in your components
import type { BadgeType } from './components'
import type { FlatIconRegular, FlatIconType } from './components'

// Example usage:
const badgeType: BadgeType = 'primary'
const iconName: FlatIconRegular = 'fi-rr-home'

// Export simplified plugin
export { CompositorPlugin }
