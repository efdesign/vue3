import type { App } from 'vue'
import Flex from './Flex.vue'

export const FlexPlugin = {
  install(app: App) {
    app.component('Flex', Flex)
  }
}

export default FlexPlugin
export { Flex }
