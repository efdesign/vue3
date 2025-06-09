import './assets/main.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'

// Import the plugin
import CompositorPlugin from './plugins'

const app = createApp(App);

// Custom directive
app.directive('fancy', (el,binding)=>{
    el.innerText = "fancy!: " + el.innerText;
    el.style.color = "red";
})

// Install plugins
app.use(VueQueryPlugin);
app.use(CompositorPlugin); // This registers all components globally

app.mount('#app');
