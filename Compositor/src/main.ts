import './assets/main.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.directive('fancy', (el,binding)=>{
    el.innerText = "fancy!: " + el.innerText;
    el.style.color = "red";
})
app.use(VueQueryPlugin);
app.mount('#app');
