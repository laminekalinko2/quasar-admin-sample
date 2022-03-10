<template>
   <q-card
      class="tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden"
      flat
      square
   >
      <q-card-section>
         <div class="tw-flex tw-w-full tw-justify-between">
            <div class="tw-text-4xl tw-font-medium">
               {{ title }}
            </div>

            <q-space />

            <div>
               <slot name="actions" />
            </div>
         </div>
      </q-card-section>
      <q-card-section class="tw-flex tw-h-full tw-w-full tw-overflow-scroll">
         <q-table
            :rows="state.rows"
            :columns="columnDefs"
            row-key="name"
            flat
            dense
            virtual-scroll
            :loading="state.loading"
            :pagination="{
               rowsPerPage: 0,
            }"
            :rows-per-page-options="[0]"
         >
            <template v-slot:header="props">
               <q-tr :props="props">
                  <q-th
                     v-for="col in props.cols"
                     :key="col.name"
                     :props="props"
                     class="tw-h-10 tw-bg-gray-100 tw-text-sm tw-font-medium"
                  >
                     {{ col.label }}
                  </q-th>
               </q-tr>
            </template>

            <template v-slot:loading>
               <q-inner-loading showing color="primary" />
            </template>

            <!-- this is a passthrout for all table related slot that are but in parent -->
            <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
               <slot :name="slot" v-bind="{ ...scope }" />
            </template>

            <template #body-cell-actions="props">
               <q-td class="tw-space-x-5 tw-text-right">
                  <slot
                     name="action-start"
                     :row="props.row"
                     :onRemove="onRemove"
                  />

                  <q-btn
                     class="tw-font-semibold"
                     flat
                     no-caps
                     rounded
                     color="primary"
                     label="Edit"
                     @click.stop="$emit('edit', props.row)"
                  />
                  <q-btn
                     class="tw-font-semibold"
                     flat
                     no-caps
                     rounded
                     color="red"
                     label="Delete"
                     @click.stop="onRemove(props.row.id)"
                  />

                  <slot
                     name="action-end"
                     :row="props.row"
                     :onRemove="onRemove"
                  />
               </q-td>
            </template>
         </q-table>
      </q-card-section>

      <slot name="form" :onCreateUpdate="onCreateUpdate" />
   </q-card>
</template>

<script lang="ts" setup>
import { reactive, watch, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
import http from '@/utils/http';
import QTableColumnDef from '@/types/QTableColumnDef';

const props = defineProps<{
   columnDefs: QTableColumnDef[];
   dataEndpoint: string;
   title: string;
   refreshData?: false;
}>();

const emit = defineEmits(['edit', 'update:refreshData']);

const state = reactive({
   rows: [] as Array<Record<string, unknown>>,
   loading: true,
});
const $q = useQuasar();

watchEffect(() => {
   fetchData();
});

watch(
   () => props.refreshData,
   (current) => {
      if (current) {
         fetchData();
         emit('update:refreshData', false);
      }
   }
);

function fetchData() {
   state.loading = true;
   state.rows = [];
   http.get(`${props.dataEndpoint}`).then(({ data }) => {
      state.rows = data;
      state.loading = false;
   });
}

function onRemove(itemId: number) {
   $q.dialog({
      title: 'Delete this item ?',
      message: `<p class="tw-text-base">Are you sure you want to delete this item?</p>`,
      html: true,
      ok: {
         label: 'Yes, Delete',
         flat: true,
      },
      cancel: {
         color: 'default',
         flat: true,
      },
   }).onOk(() => {
      http.delete(`${props.dataEndpoint}/${itemId}`).then(() => {
         const index = state.rows.findIndex((v) => v.id === itemId);

         if (index > -1) {
            state.rows.splice(index, 1);

            $q.notify({
               type: 'positive',
               message: 'Item deleted with success.',
            });
         }
      });
   });
}

function onCreateUpdate(data: Record<string, unknown>) {
   const index = state.rows.findIndex((v) => v.id == data.id);

   if (index > -1) {
      state.rows.splice(index, 1, data);
   } else {
      state.rows.push(data);
   }
}
</script>
