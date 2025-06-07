import './assets/main.css'
import {createApp} from 'vue'
import App from './App.vue'
import AppBasics from './AppBasics.vue'


const app = createApp(AppBasics,{msg: 'Hello Vue 3!',married:true})

app.mount('#app')
