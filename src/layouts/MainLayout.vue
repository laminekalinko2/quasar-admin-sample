<template>
   <q-layout view="hHh LpR lFr" class="tw-h-screen tw-w-screen tw-bg-gray-100">
      <q-header class="app-header tw-bg-primary tw-text-white">
         <q-toolbar class="tw-h-20">
            <q-btn
               size="xl"
               dense
               flat
               round
               icon="menu"
               @click="state.showTabMenu = !state.showTabMenu"
            />

            <q-toolbar-title>
               <h1 class="tw-text-4xl tw-font-medium">
                  Quasar Admin Sample
               </h1>
            </q-toolbar-title>

            <q-space />

            <div class="tw-mt-6 tw-flex tw-items-center tw-space-x-3 sm:tw-mt-0 sm:tw-ml-2">
               <div class="tw-ml-4 tw-flex tw-min-w-0 tw-flex-col">
                  <div class="tw-text-4xl tw-tracking-tight">
                     Welcome,
                     <span class="tw-text-secondary">
                        {{ userStore.fullName }}
                     </span>
                  </div>
               </div>

               <q-btn
                  flat
                  round
                  dense
                  size="xl"
                  icon="logout"
                  @click="logout"
               />
            </div>
         </q-toolbar>

         <q-tabs
            v-if="state.showTabMenu"
            inline-label
            no-caps
            class="tw-bg-white tw-text-gray-700"
            active-class="tw-text-secondary"
            dense
            outside-arrows
         >
            <q-route-tab
               :to="{ name: 'admin.dashboard' }"
               label="Dashboard"
               icon="dashboard_customize"
            />
            <q-route-tab
               :to="{ name: 'admin.settings' }"
               label="Settings"
               icon="settings_suggest"
            />
         </q-tabs>
      </q-header>

      <q-page-container class="tw-flex tw-justify-around">
         <q-page class="tw-w-screen tw-max-w-screen-2xl tw-overflow-hidden tw-p-5">
            <div class="tw-flex tw-justify-around tw-overflow-auto" style="height: calc(100vh - 205px)">
               <router-view />
            </div>
         </q-page>
      </q-page-container>

      <q-footer class="tw-bg-gray-100 tw-text-gray-800">
         <q-page-sticky position="bottom-right" :offset="[20, -20]">
            <q-fab
               icon="add"
               direction="up"
               color="accent"
            >
               <q-fab-action color="primary" icon="person_add" />
               <q-fab-action color="primary" icon="mail" />
            </q-fab>
         </q-page-sticky>

         <div class="tw-pb-5 tw-text-center">
            <span class="tw-font-medium">
               Copyright © {{ new Date().getFullYear() }}
               <a
                  href="#"
                  target="__blank"
                  class="tw-hover:underline tw-py-1"
               > Quasar Admin Sample Footer </a>
            </span>
         </div>
      </q-footer>
   </q-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const state = reactive({
   showTabMenu: true,
});

function logout() {
   userStore.$reset();
   router.push({ name: 'login' });
}
</script>

<style>
.app-header .q-tab {
   padding: 3px 9px !important;
}
</style>
