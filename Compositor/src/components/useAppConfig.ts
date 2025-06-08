import { inject, type Ref } from 'vue'
import type { AppConfig } from '../AppConfig'
import { configKey } from '../AppConfig'

export function useAppConfig(): Ref<AppConfig> {
  const config = inject(configKey)
  
  if (!config) {
    throw new Error('useAppConfig must be used within a component that provides AppConfig')
  }
  
  return config
}