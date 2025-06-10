import './assets/main.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'

// Import the plugin
import CompositorPlugin from './plugins'
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia();

// Custom directive
app.directive('fancy', (el,binding)=>{
    el.innerText = "fancy!: " + el.innerText;
    el.style.color = "red";
})

// Install plugins
app.use(VueQueryPlugin);
app.use(CompositorPlugin); // This registers all components globally
app.use(pinia);

app.mount('#app');
