<template>
   <q-layout class="tw-bg-gray-50">
      <q-page-container>
         <q-page class="tw-flex tw-items-center">
            <div class="tw-mb-48 tw-flex tw-w-full tw-justify-around">
               <q-card class="tw-rounded-xl">
                  <q-card-section>
                     <div class="tw-mx-auto tw-w-80">
                        <h1 class="tw-text-5xl tw-font-normal">
                           Quasar Admin
                        </h1>
                     </div>
                  </q-card-section>
                  <q-form @submit.prevent="submit" class="tw-space-y-10 tw-p-10">
                     <base-input
                        v-model="state.formData.username"
                        :validator="v$.formData.username"
                        label="Username"
                        hint="Enter: admin"
                     >
                        <template v-slot:prepend>
                           <q-icon name="person" />
                        </template>
                     </base-input>
                     <base-input
                        :type="!state.showPassword ? 'password' : 'text'"
                        v-model="state.formData.password"
                        :validator="v$.formData.password"
                        label="Password"
                        hint="Enter: 12345"
                     >
                        <template v-slot:prepend>
                           <q-icon name="lock" />
                        </template>

                        <template v-slot:append>
                           <q-icon
                              :name="state.showPassword ? 'visibility_off' : 'visibility'"
                              class="cursor-pointer"
                              @click="state.showPassword = !state.showPassword"
                           />
                        </template>
                     </base-input>

                     <q-btn
                        rounded
                        no-caps
                        class="tw-w-full tw-text-lg"
                        label="Sign in"
                        color="primary"
                        type="submit"
                     />
                  </q-form>
               </q-card>
            </div>
         </q-page>
      </q-page-container>
   </q-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useQuasar } from 'quasar';
import http from '@/utils/http';
import { useUserStore } from '@/stores/userStore';

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const state = reactive({
   loading: true,
   showPassword: false,
   formData: {
      username: '',
      password: '',
   },
});
const validationRules = {
   formData: {
      username: { required },
      password: { required },
   },
};

const v$ = useVuelidate(validationRules, state);

async function submit() {
   if (await v$.value.$validate()) {
      http.post(`/login`, { ...state.formData }).then(({ data }) => {
         if (data.accessToken && data.accessUser) {
            userStore.$patch(data);
            router.push({ name: 'admin.dashboard' });
         }

         if (data.incorrectCedentials) {
            $q.notify({
               type: 'negative',
               position: 'bottom',
               timeout: 10000,
               message: 'You have entered an invalid username or password.',
            });
         }
      });
   }
}
</script>
