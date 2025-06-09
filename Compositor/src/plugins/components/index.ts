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
import PictureInPicture from './PictureInPicture.vue'

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
  CustomDirective,
  PictureInPicture
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
  CustomDirective,
  PictureInPicture
}

// Export types and utilities inline
// Badge types
export const badgeTypes = [
  'primary', 
  'secondary', 
  'success', 
  'danger', 
  'warning', 
  'info', 
  'light', 
  'dark', 
  'married', 
  'single'
] as const;

export type BadgeType = typeof badgeTypes[number];

// Icon types (basic subset for now)
export type FlatIconRegular = 
  | 'fi-rr-eye' | 'fi-rr-eye-crossed' | 'fi-rr-heart' | 'fi-rr-star'
  | 'fi-rr-home' | 'fi-rr-user' | 'fi-rr-users' | 'fi-rr-settings'
  | 'fi-rr-search' | 'fi-rr-menu-burger' | 'fi-rr-menu-dots'
  | 'fi-rr-cross' | 'fi-rr-check' | 'fi-rr-plus' | 'fi-rr-minus';

export type FlatIconSolid = string;
export type FlatIconBrands = string;
export type FlatIconType = FlatIconRegular | FlatIconSolid | FlatIconBrands;
