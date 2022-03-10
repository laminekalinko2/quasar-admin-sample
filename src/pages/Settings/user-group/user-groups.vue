it config core.ignorecase false
<template>
   <base-crud-list
      title="User Groupss"
      data-endpoint="/user-groups"
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
            :title="state.selectedRowId > 0 ? 'Edit Company Type' : 'Create Company Type'"
            @close="onFormDialogClose"
            :loading="state.formLoading"
         >
            <UserGroupForm @submit="submitForm($event, onCreateUpdate)" :initial-data="state.formInitialData" />
         </base-dialog>
      </template>
   </base-crud-list>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { UserGroup } from '@/types';
import UserGroupForm from './user-group-form.vue';
import http from '@/utils/http';
import { useQuasar } from 'quasar';

const state = reactive({
   showFormDialog: false,
   formLoading: false,
   selectedRowId: 0,
   columns: [
      { field: 'groupName', name: 'groupName', label: 'Group Name', align: 'left' },
      {
         field: 'description',
         name: 'description',
         label: 'Description',
         align: 'left',
      },
      { name: 'actions', align: 'right', field: 'actions' },
   ],
   formInitialData: {} as UserGroup,
});
const $q = useQuasar();

async function onEdit(data: UserGroup) {
   state.formLoading = true;
   state.showFormDialog = true;
   state.selectedRowId = Number(data?.id);

   if (state.selectedRowId) {
      const result = await http.get<UserGroup>(`/user-groups/${state.selectedRowId}`);
      if (result.data?.id) {
         state.formInitialData = result.data;
      }
   }

   state.formLoading = false;
}

function onFormDialogClose() {
   state.selectedRowId = 0;
   state.formInitialData = {} as UserGroup;
}

async function submitForm(payload: UserGroup, callback: (arg: unknown) => void) {
   const result = await http.post<UserGroup>('/user-groups', payload);
   if (result.data?.id) {
      $q.notify({
         type: 'positive',
         message: 'User group saved with success.',
      });
      callback(result.data);
   }
   state.showFormDialog = false;
}
</script>
