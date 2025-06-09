import type { App } from 'vue'
import Icon from './Icon.vue'

export const IconPlugin = {
  install(app: App) {
    app.component('Icon', Icon)
  }
}

export default IconPlugin
export { Icon }
