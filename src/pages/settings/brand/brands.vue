<template>
   <base-crud-list
      title="Brands"
      data-endpoint="/brands"
      :column-defs="state.columns"
      @edit="onEdit"
   >
      <template #actions>
         <q-btn
            color="primary"
            icon="add"
            no-caps
            rounded
            @click="onEdit"
            label="Create"
         />
      </template>

      <template #body-cell-active="props">
         <q-td :props="props">
            <q-badge
               v-if="props.value"
               label="Yes"
               color="green"
               class="tw-font-semibold"
            />
            <q-badge
               v-else
               label="No"
               color="red"
               class="tw-font-semibold"
            />
         </q-td>
      </template>

      <template #form="{ onCreateUpdate }">
         <base-dialog
            v-model:open="state.showFormDialog"
            :title="state.selectedRowId > 0 ? 'Edit Brand' : 'Create Brand'"
            @close="onFormDialogClose"
            :loading="state.formLoading"
         >
            <BrandForm @submit="submitForm($event, onCreateUpdate)" :initial-data="state.formInitialData" />
         </base-dialog>
      </template>
   </base-crud-list>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Brand } from '@/types';
import BrandForm from './brand-form.vue';
import http from '@/utils/http';
import { useQuasar } from 'quasar';

const state = reactive({
   showFormDialog: false,
   formLoading: false,
   selectedRowId: 0,
   columns: [
      { field: 'name', name: 'name', label: 'Name', align: 'left' },
      { field: 'email', name: 'email', label: 'Email', align: 'left' },
      { field: 'active', name: 'active', label: 'Is Active ?', align: 'center' },
      { name: 'actions', align: 'right', field: 'actions' },
   ],
   formInitialData: {} as Brand,
});
const $q = useQuasar();

async function onEdit(data: Brand) {
   state.formLoading = true;
   state.showFormDialog = true;
   state.selectedRowId = Number(data?.id);

   if (state.selectedRowId) {
      const result = await http.get<Brand>(`/brands/${state.selectedRowId}`);
      if (result.data?.id) {
         state.formInitialData = result.data;
      }
   }

   state.formLoading = false;
}

function onFormDialogClose() {
   state.selectedRowId = 0;
   state.formInitialData = {} as Brand;
}

async function submitForm(payload: Brand, callback: (arg: unknown) => void) {
   const result = await http.post<Brand>('/brands', payload);
   if (result.data?.id) {
      $q.notify({
         type: 'positive',
         message: 'Brand saved with success.',
      });
      callback(result.data);
   }
   state.showFormDialog = false;
}
</script>
