import type { App } from 'vue'

// Import all components from the new locations
import Panel from './Panel/Panel.vue'
import Flex from './Flex.vue'
import Grid from './Grid.vue'
import Icon from './Icon.vue'
import Layout from './Layout.vue'
import Loading from './Loading.vue'
import Error from './Error.vue'

import Badge from './Badge.vue'
import CustomDirective from './CustomDirective.vue'

// Define component names for global registration
const components = {
  Panel,
  Flex,
  Grid,
  Icon,
  Layout,
  Loading,
  Error,
  
  Badge,
  CustomDirective
}

// Individual component plugins
export const PanelPlugin = {
  install(app: App) {
    app.component('Panel', Panel)
  }
}

export const FlexPlugin = {
  install(app: App) {
    app.component('Flex', Flex)
  }
}

export const GridPlugin = {
  install(app: App) {
    app.component('Grid', Grid)
  }
}

export const IconPlugin = {
  install(app: App) {
    app.component('Icon', Icon)
  }
}

export const LayoutPlugin = {
  install(app: App) {
    app.component('Layout', Layout)
  }
}

export const LoadingPlugin = {
  install(app: App) {
    app.component('Loading', Loading)
  }
}

export const ErrorPlugin = {
  install(app: App) {
    app.component('Error', Error)
  }
}



export const BadgePlugin = {
  install(app: App) {
    app.component('Badge', Badge)
  }
}

export const CustomDirectivePlugin = {
  install(app: App) {
    app.component('CustomDirective', CustomDirective)
  }
}

// Main components plugin that installs all components
export const ComponentsPlugin = {
  install(app: App) {
    // Register all components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

// Export components for individual imports
export {
  Panel,
  Flex,
  Grid,
  Icon,
  Layout,
  Loading,
  Error,
  
  Badge,
  CustomDirective
}

// Export types and utilities will be added later
// export { badgeTypes, type BadgeType } from './BadgeTypes'
// export type { FlatIconRegular, FlatIconSolid, FlatIconBrands, FlatIconType } from './IconTypes'
