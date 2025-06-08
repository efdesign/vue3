import type { InjectionKey, Ref } from 'vue'

export type AppConfig = {
  iconSize: number;
  panelBackgroundColor: string;
  defaultPadding: string;
  defaultBorderRadius: string;
  defaultBoxShadow: string;
  toolbarGap: number;
  toolbarPadding: number;
  toolbarWidth: number;
  gridToolbarStyle: Record<string, any>;
};

export const configKey: InjectionKey<Ref<AppConfig>> = Symbol('config');