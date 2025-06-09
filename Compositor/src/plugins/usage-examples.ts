import { createApp } from 'vue'
import App from '../App.vue'

// ========================================
// Different ways to use the Compositor plugins
// ========================================

// Method 1: Install all components and composables at once (Recommended)
import CompositorPlugin from './index'

const app1 = createApp(App)
app1.use(CompositorPlugin)
// Now all components are globally available:
// Panel, Flex, Grid, Icon, Layout, Loading, Error, Barge, Badge, CustomDirective
// And composables are available via injection or global properties

// ========================================

// Method 2: Install plugins selectively
import { 
  ComponentsPlugin,
  ComposablesPlugin
} from './index'

import { 
  PanelPlugin, 
  FlexPlugin, 
  GridPlugin, 
  IconPlugin,
  BadgePlugin,
  BargePlugin
} from './components'

const app2 = createApp(App)
app2.use(ComponentsPlugin) // All components
app2.use(ComposablesPlugin) // All composables
// OR individually:
app2.use(PanelPlugin)
app2.use(FlexPlugin)
app2.use(GridPlugin)
app2.use(IconPlugin)
app2.use(BadgePlugin)
app2.use(BargePlugin)

// ========================================

// Method 3: Import components and composables directly
import { 
  Panel, 
  Flex, 
  Grid, 
  Icon, 
  Layout, 
  Loading, 
  Error, 
  Barge, 
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
    Badge,
    Barge
  }
}

export {
  CompositorPlugin,
  PanelPlugin,
  FlexPlugin,
  GridPlugin,
  IconPlugin,
  BadgePlugin,
  BargePlugin
}
