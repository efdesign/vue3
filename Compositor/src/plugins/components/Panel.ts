import type { App } from 'vue'
import Panel from './Panel/Panel.vue'

export const PanelPlugin = {
  install(app: App) {
    app.component('Panel', Panel)
  }
}

export default PanelPlugin
export { Panel }
