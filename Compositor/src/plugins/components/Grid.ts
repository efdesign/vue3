import type { App } from 'vue'
import Grid from './Grid.vue'

export const GridPlugin = {
  install(app: App) {
    app.component('Grid', Grid)
  }
}

export default GridPlugin
export { Grid }
