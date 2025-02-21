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
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
