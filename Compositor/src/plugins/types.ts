import type { App } from 'vue'

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Panel: typeof import('./components/Panel/Panel.vue')['default']
    Flex: typeof import('./components/Flex.vue')['default']
    Grid: typeof import('./components/Grid.vue')['default']
    Icon: typeof import('./components/Icon.vue')['default']
    Layout: typeof import('./components/Layout.vue')['default']
    Loading: typeof import('./components/Loading.vue')['default']
    Error: typeof import('./components/Error.vue')['default']
    Barge: typeof import('./components/Barge.vue')['default']
    Badge: typeof import('./components/Badge.vue')['default']
    CustomDirective: typeof import('./components/CustomDirective.vue')['default']
  }
  
  interface ComponentCustomProperties {
    $useMouseCoordinates: typeof import('./composables/useMouseCoordinates')['useMouseCoordinates']
  }
}

export interface CompositorPluginOptions {
  prefix?: string
  components?: string[]
  composables?: string[]
}

export interface Plugin {
  install(app: App, options?: CompositorPluginOptions): void
}
