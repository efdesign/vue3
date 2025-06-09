import type { App } from 'vue'
import CustomDirective from './CustomDirective.vue'

export const CustomDirectivePlugin = {
  install(app: App) {
    app.component('CustomDirective', CustomDirective)
  }
}

export default CustomDirectivePlugin
export { CustomDirective }
