import './assets/main.css'
import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './utils/yupTranslate.ts'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})

app.use(ToastPlugin,{
  position: 'top-right'
})
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
