import './assets/css/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'dark-mode',
        }
    }
});
app.use(router)

app.mount('#app')
