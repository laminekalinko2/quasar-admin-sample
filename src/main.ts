import { createApp } from 'vue';
import { Quasar, Dialog, Notify } from 'quasar';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import BaseInput from '@/components/base-input.vue';
import BaseSelect from '@/components/base-select.vue';
import BaseDialog from '@/components/base-dialog.vue';
import BaseCrudList from '@/components/base-crud-list.vue';
import BasePhoneInput from '@/components/base-phone-input.vue';
import BaseZipcodeInput from '@/components/base-zipcode-input.vue';

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
app.component('base-input', BaseInput);
app.component('BaseSelect', BaseSelect);
app.component('BaseDialog', BaseDialog);
app.component('BasePhoneInput', BasePhoneInput);
app.component('BaseZipcodeInput', BaseZipcodeInput);
app.component('BaseCrudList', BaseCrudList);

app.mount('#app');
