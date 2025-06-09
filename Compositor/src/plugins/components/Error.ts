import type { App } from 'vue'
import Error from './Error.vue'

export const ErrorPlugin = {
  install(app: App) {
    app.component('Error', Error)
  }
}

export default ErrorPlugin
export { Error }
