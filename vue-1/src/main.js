import './assets/main.css'
import {createApp} from 'vue'
import App from './App.vue'
import AppBasics from './AppBasics.vue'

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
const app = createApp(AppBasics,{msg: 'Hello Vue 3!',married:true})


// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // 5 minutes
//       cacheTime: 10 * 60 * 1000, // 10 minutes
//       retry: 3,
//       refetchOnWindowFocus: false,
//     },
//     mutations: {
//       retry: 1,
//     },
//   },
// })

// app.use(VueQueryPlugin, { queryClient })

app.use(VueQueryPlugin)

app.mount('#app')
