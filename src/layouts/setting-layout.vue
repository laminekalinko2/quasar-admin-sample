<template>
   <q-card
      class="tw-mt-3 tw-flex tw-w-full tw-overflow-hidden"
      flat
      bordered
      square
   >
      <div class="tw-w-64">
         <q-list class="tw-h-full tw-w-64 tw-border-r tw-font-medium" separator>
            <q-item-label header class="tw-pt-7 tw-text-3xl tw-font-bold tw-text-gray-700">
               {{ title }}
            </q-item-label>

            <q-item
               v-for="(menu, index) in menus"
               :key="index"
               clickable
               v-ripple
               :to="menu.to"
               exact
               active-class="tw-text-secondary"
            >
               <q-item-section v-if="menu?.icon" avatar>
                  <q-icon :name="menu.icon" />
               </q-item-section>

               <q-item-section>{{ menu.label }}</q-item-section>
            </q-item>
         </q-list>
      </div>
      <div class="tw-flex tw-h-full tw-w-full tw-justify-around tw-overflow-auto tw-px-6 tw-pt-3">
         <slot />
      </div>
   </q-card>
</template>

<script lang="ts">
import { MenuItem } from '@/types';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
   name: 'SettingLayout',
   props: {
      title: {
         type: String,
         default: '',
      },

      menus: {
         type: Array as PropType<MenuItem[]>,
         default: () => [],
      },
   },
});
</script>
