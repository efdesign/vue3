import { inject, provide, ref, computed, type InjectionKey, type Ref, type ComputedRef } from 'vue'

// Define the AppConfig type
export type AppConfig = {
  iconSize: number;
  baseColor: string;
  iconColor:string;
  panelBackgroundColor: string;
  defaultPadding: string;
  defaultBorderRadius: string;
  defaultBoxShadow: string;
  toolbarGap: number;
  toolbarPadding: number;
  toolbarWidth: number;
  gridToolbarStyle: Record<string, any>;
};

// Create the injection key
const configKey: InjectionKey<Ref<AppConfig>> = Symbol('config');

// Provider function to be used in root component (App.vue)
export function provideAppConfig(): Ref<AppConfig> {
  // Define configuration values
  const iconSize = 16;
  const baseColor = '#333'; // Base color for icons and text
  const iconColor = '#333'; // Default color for icons
  const panelBackgroundColor = '#f0f0f0';
  const defaultPadding = '1rem';
  const defaultBorderRadius = '2px';
  const defaultBoxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  const toolbarGap = 5;
  const toolbarPadding = 5;

  // Computed toolbar width based on icon size and spacing
  const toolbarWidth = computed(() => {
    return ((iconSize * 2) + 10) + (toolbarGap) + (2 * toolbarPadding);
  });

  const gridToolbarStyle = {
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  // Create reactive config object
  const config: Ref<AppConfig> = ref({
    iconSize,
    baseColor,
    iconColor,
    panelBackgroundColor,
    defaultPadding,
    defaultBorderRadius,
    defaultBoxShadow,
    toolbarGap,
    toolbarPadding,
    toolbarWidth: toolbarWidth.value,
    gridToolbarStyle
  });

  // Provide the config to child components
  provide(configKey, config);

  return config;
}

// Consumer function to be used in child components
export function useAppConfig(): Ref<AppConfig> {
  const config = inject(configKey);
  
  if (!config) {
    throw new Error('useAppConfig must be used within a component that provides AppConfig');
  }
  
  return config;
}

// Export additional helper functions for common style objects
// Note: These functions should only be used in child components, not in the root component that provides the config
export function useToolPanelStyle(): ComputedRef<Record<string, any>> {
  const config = useAppConfig();
  
  return computed(() => ({
    backgroundColor: config.value.panelBackgroundColor,
    padding: config.value.defaultPadding,
    borderRadius: config.value.defaultBorderRadius,
    boxShadow: config.value.defaultBoxShadow,
    width: '200px',
  }));
}

export function useCompositionPanelStyle(): ComputedRef<Record<string, any>> {
  const config = useAppConfig();
  
  return computed(() => ({
    backgroundColor: config.value.panelBackgroundColor,
    padding: config.value.defaultPadding,
    borderRadius: config.value.defaultBorderRadius,
    boxShadow: config.value.defaultBoxShadow,
    width: '400px',
  }));
}
