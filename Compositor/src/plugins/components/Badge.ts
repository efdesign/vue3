import type { App } from 'vue'
import Badge from './Badge.vue'

export const BadgePlugin = {
  install(app: App) {
    app.component('Badge', Badge)
  }
}

export default BadgePlugin
export { Badge }
