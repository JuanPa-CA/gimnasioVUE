import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { router } from './router/index.js'


// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import global styles
import './style.css'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

app.use(router)

app.mount('#app')
