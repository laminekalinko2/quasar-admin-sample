<template>
   <q-dialog
      :model-value="open"
      @hide="
         $emit('update:open', false);
         $emit('close');
      "
   >
      <q-card :class="`model-${size}`">
         <q-toolbar class="h-16">
            <q-toolbar-title>{{ title }}</q-toolbar-title>

            <q-space />

            <q-btn
               flat
               dense
               icon="close"
               v-close-popup
            >
               <q-tooltip class="bg-white text-primary">
                  Close
               </q-tooltip>
            </q-btn>
         </q-toolbar>

         <q-separator />

         <div v-if="loading" class="tw-flex tw-justify-around tw-py-36">
            <q-spinner-dots size="50px" color="primary" />
         </div>

         <div v-else class="tw-flex tw-justify-around tw-overflow-auto">
            <q-card-section class="card-section tw-overflow-scroll tw-p-5">
               <slot />
            </q-card-section>
         </div>
      </q-card>
   </q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
   props: {
      /**
       * a boolean to indicate if dialog should be open
       */
      open: {
         type: Boolean,
         default: true,
      },

      /**
       * The title of the dialog
       */
      title: {
         type: String,
         required: false,
         default: '',
      },

      /**
       * The size of the dialog
       * @values sm, md, lg, xl
       */
      size: {
         type: String,
         default: 'sm',
         validator(size: string) {
            return ['sm', 'md', 'lg', 'xl'].includes(size);
         },
      },

      /**
       * a boolean to indicate if dialog in loading state
       */
      loading: {
         type: Boolean,
         default: false,
      },
   },

   emits: ['close', 'update:open'],
});
</script>

<style lang="scss" scoped>
.model-sm {
   min-width: 640px !important;
   max-width: 640px !important;
}
.model-md {
   min-width: 768px !important;
   max-width: 768px !important;
}
.model-lg {
   min-width: 1024px !important;
   max-width: 1024px !important;
}
.model-xl {
   min-width: 1280px !important;
   max-width: 1280px !important;
}
</style>
