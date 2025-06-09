# Compositor Plugin System

This plugin system allows you to register Vue components globally in your application. The following components are available:

- **Panel** - Container component with title and subtitle
- **Flex** - Flexbox layout component
- **Grid** - CSS Grid layout component
- **Icon** - Icon display component
- **Layout** - Main layout component with slots
- **Loading** - Loading indicator component
- **Error** - Error display component
- **Barge** - Container component with different variants

## Installation

### Method 1: Install all components at once (Recommended)

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import CompositorPlugin from './plugins'

const app = createApp(App)
app.use(CompositorPlugin)
app.mount('#app')
```

After installation, all components are available globally in your templates:

```vue
<template>
  <Layout>
    <Panel title="My Panel">
      <Flex direction="column">
        <Grid :columns="2">
          <Icon name="fi-rr-heart" />
          <Barge variant="success">Success!</Barge>
        </Grid>
        <Loading v-if="isLoading" />
        <Error v-if="hasError" />
      </Flex>
    </Panel>
  </Layout>
</template>
```

### Method 2: Install components selectively

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { PanelPlugin, FlexPlugin, GridPlugin } from './plugins/components'

const app = createApp(App)
app.use(PanelPlugin)   // Only Panel available globally
app.use(FlexPlugin)    // Only Flex available globally
app.use(GridPlugin)    // Only Grid available globally
app.mount('#app')
```

### Method 3: Import individual plugin files

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import PanelPlugin from './plugins/components/Panel'
import FlexPlugin from './plugins/components/Flex'

const app = createApp(App)
app.use(PanelPlugin)
app.use(FlexPlugin)
app.mount('#app')
```

### Method 4: Import components directly (local registration)

```typescript
import { Panel, Flex, Grid, Icon } from './plugins/components'

export default {
  components: {
    Panel,
    Flex,
    Grid,
    Icon
  }
}
```

## Available Plugins

### Individual Component Plugins
- `PanelPlugin` - Registers Panel component globally
- `FlexPlugin` - Registers Flex component globally
- `GridPlugin` - Registers Grid component globally
- `IconPlugin` - Registers Icon component globally
- `LayoutPlugin` - Registers Layout component globally
- `LoadingPlugin` - Registers Loading component globally
- `ErrorPlugin` - Registers Error component globally
- `BargePlugin` - Registers Barge component globally

### Bundle Plugins
- `ComponentsPlugin` - Registers all components globally
- `CompositorPlugin` - Main plugin that includes all other plugins

## TypeScript Support

The plugin system includes TypeScript declarations for better IntelliSense support. All globally registered components are properly typed and will show up in your IDE autocomplete.

## File Structure

```
src/
├── plugins/
│   ├── index.ts                 # Main plugin entry point
│   ├── types.ts                 # TypeScript declarations
│   ├── usage-examples.ts        # Usage examples
│   └── components/
│       ├── index.ts             # Components bundle plugin
│       ├── Panel.ts             # Panel plugin
│       ├── Flex.ts              # Flex plugin
│       ├── Grid.ts              # Grid plugin
│       ├── Icon.ts              # Icon plugin
│       ├── Layout.ts            # Layout plugin
│       ├── Loading.ts           # Loading plugin
│       ├── Error.ts             # Error plugin
│       └── Barge.ts             # Barge plugin
└── components/                  # Original component files
    ├── Panel/
    ├── Flex.vue
    ├── Grid.vue
    ├── Icon.vue
    ├── Layout.vue
    ├── Loading.vue
    ├── Error.vue
    └── Barge.vue
```

## Benefits

1. **Global Availability**: Components are available in all templates without explicit imports
2. **Selective Installation**: Install only the components you need
3. **TypeScript Support**: Full type checking and IntelliSense
4. **Modular**: Each component can be installed independently
5. **Tree Shaking**: Unused components won't be included in the bundle when using selective installation
