import type { App } from 'vue'
import Loading from './Loading.vue'

export const LoadingPlugin = {
  install(app: App) {
    app.component('Loading', Loading)
  }
}

export default LoadingPlugin
export { Loading }
