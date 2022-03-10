<template>
   <base-crud-list
      title="Users"
      data-endpoint="/users"
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

      <template v-slot:body-cell-brand="props">
         <q-td :props="props">
            {{ props.value?.name }}
         </q-td>
      </template>

      <template #form="{ onCreateUpdate }">
         <base-dialog
            v-model:open="state.userFormOpen"
            :title="state.selectedRowId > 0 ? 'Edit User' : 'Create User'"
            @close="onFormDialogClose"
            :loading="state.userFormLoading"
            size="lg"
         >
            <UserForm
               @submit="submitForm($event, onCreateUpdate)"
               :initial-data="state.formInitialData"
               :brands="state.brands"
               :user-groups="state.userGroups"
            />
         </base-dialog>
      </template>

      <template #action-start="props">
         <q-btn
            class="tw-text-xs tw-font-semibold"
            flat
            no-caps
            rounded
            icon="lock_reset"
            @click="
               state.passwordResetUserId = props.row.id;
               state.openResetPasswordForm = true;
            "
         />
      </template>
   </base-crud-list>

   <base-dialog
      v-model:open="state.openUserCredentialDialog"
      title="New user credentials"
      size="sm"
      @close="state.openUserCredentialDialog = false"
   >
      <div class="tw-space-y-2 tw-text-lg tw-font-normal">
         <p><b>Email: </b> {{ state.newUserData.email }}</p>
         <p><b>Username: </b> {{ state.newUserData.username }}</p>
         <p><b>Password: </b> {{ state.newUserData.password }}</p>
      </div>
   </base-dialog>

   <base-dialog
      v-model:open="state.openResetPasswordForm"
      title="User password reset"
      size="sm"
      @close="state.openResetPasswordForm = false"
   >
      <ResetPasswordForm @passwordReset="onPasswordReset" />
   </base-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Brand, User, UserGroup } from '@/types';
import UserForm from './user-form.vue';
import ResetPasswordForm from './reset-password-form.vue';
import http from '@/utils/http';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const state = reactive({
   userFormOpen: false,
   userFormLoading: true,
   selectedRowId: 0,

   newUserData: {} as User,
   openUserCredentialDialog: false,

   openResetPasswordForm: false,
   passwordResetUserId: undefined,

   columns: [
      { field: 'brand', name: 'brand', label: 'Brand', align: 'left' },
      { field: 'firstName', name: 'firstName', label: 'First name', align: 'left' },
      { field: 'lastName', name: 'lastName', label: 'Last name', align: 'left' },
      { field: 'username', name: 'username', label: 'Username', align: 'left' },
      { field: 'email', name: 'email', label: 'Email', align: 'left' },
      { field: 'active', name: 'active', label: 'Is Active ?', align: 'center' },
      { name: 'actions', align: 'right', field: 'actions' },
   ],

   userGroups: [] as UserGroup[],
   brands: [] as Brand[],
   formInitialData: {} as User,
});

async function onEdit(data: User) {
   state.userFormLoading = true;
   state.userFormOpen = true;

   if (data?.id) {
      state.selectedRowId = Number(data?.id);

      const result = await http.get<User>(`/users/${state.selectedRowId}`);
      if (result.data?.id) {
         state.formInitialData = result.data;
      }
   }

   await fetchSiteOperators();
   await fetchUserGroups();

   state.userFormLoading = false;
}

function onFormDialogClose() {
   state.selectedRowId = 0;
   state.formInitialData = {} as User;
}

async function submitForm(payload: User, callback: (arg: unknown) => void) {
   const result = await http.post<User>('/users', payload);

   if (result.data?.id) {
      $q.notify({
         type: 'positive',
         message: 'Users saved with success.',
      });
      callback(result.data);

      if (state.selectedRowId == 0) {
         state.newUserData = result.data;
         setTimeout(() => {
            state.openUserCredentialDialog = true;
         }, 300);
      }
   }

   state.userFormOpen = false;
}

async function fetchSiteOperators() {
   const result = await http.get<Brand[]>('/brands');
   if (result.status === 200) {
      state.brands = result.data;
   }
}

async function fetchUserGroups() {
   const result = await http.get<UserGroup[]>('/user-groups');
   if (result.status === 200) {
      state.userGroups = result.data;
   }
}

async function onPasswordReset(payload: Record<string, string>) {
   console.log(payload);
   $q.notify({
      type: 'positive',
      message: 'Password reseted with success.',
   });
   state.openResetPasswordForm = false;
}
</script>
