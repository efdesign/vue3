import type { App } from 'vue'
import Layout from './Layout.vue'

export const LayoutPlugin = {
  install(app: App) {
    app.component('Layout', Layout)
  }
}

export default LayoutPlugin
export { Layout }
