import { defineStore } from 'pinia';
import {ref, computed} from 'vue';

/*
ref()s become state properties
computed()s become getters
function()s become actions
*/
export const useAppStore = defineStore("compositor", () => {
  const appName = ref("Compositor");
  const appVersion = ref("0.0.0");  
  const comfyUIPath = ref("http://127.0.0.1:8188/comfyui");

  const incrementVersion = () => {
    const versionParts = appVersion.value.split('.');
    const lastPart = parseInt(versionParts[versionParts.length - 1], 10);
    versionParts[versionParts.length - 1] = (lastPart + 1).toString();
    appVersion.value = versionParts.join('.');
  }

  const resetVersion = () => {
    appVersion.value = "0.0.0";
  }

  function $reset() {
    appName.value = "Compositor";
    appVersion.value = "0.0.0";
    comfyUIPath.value = "http://127.0.0.1:8188/comfyui";
  }

  return {
    appName,
    appVersion,
    comfyUIPath,
    incrementVersion,
    resetVersion,
    $reset,
    version: computed(() => appVersion.value)
    };

});
