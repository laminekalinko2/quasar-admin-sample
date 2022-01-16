import { createApp } from 'vue';
import { Quasar, Dialog, Notify } from 'quasar';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import AppTextInput from '@/components/AppTextInput.vue';
import AppSelect from '@/components/AppSelect.vue';
import AppDialog from '@/components/AppDialog.vue';
import AppCrudList from '@/components/AppCrudList.vue';
import AppPhoneInput from '@/components/AppPhoneInput.vue';
import AppZipCodeInput from '@/components/AppZipCodeInput.vue';

import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import { makeServer } from './mockApi/server';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './assets/index.css';
import http from '@/utils/http';

Notify.setDefaults({
   position: 'bottom-right',
   timeout: 2500,
});

// run mirage dev in dev only
if (import.meta.env.DEV) {
   makeServer({ environment: 'development' });
}

// create and init stoe
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// app and
const app = createApp(App);

// plugins
app.use(pinia);
app.use(Quasar, {
   plugins: {
      Dialog,
      Notify,
   },

   config: {
      brand: {
         primary: '#0367a6',
         secondary: '#ff8c0a',
      },
   },
});
app.use(VueAxios, http);
app.use(router);

// components
app.component('AppTextInput', AppTextInput);
app.component('AppSelect', AppSelect);
app.component('AppDialog', AppDialog);
app.component('AppPhoneInput', AppPhoneInput);
app.component('AppZipCodeInput', AppZipCodeInput);
app.component('AppCrudList', AppCrudList);

app.mount('#app');
