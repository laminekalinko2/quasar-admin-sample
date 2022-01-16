<template>
   <q-form @submit.prevent="submit" class="tw-space-y-5">
      <div class="tw-grid tw-grid-cols-2 tw-gap-y-4 tw-gap-x-16">
         <AppTextInput
            label="First name"
            v-model="state.formData.firstName"
            :validator="v$.formData.firstName"
         />

         <AppTextInput
            label="Last name"
            v-model="state.formData.lastName"
            :validator="v$.formData.lastName"
         />

         <AppTextInput
            label="Username"
            v-model="state.formData.username"
            :validator="v$.formData.username"
         />

         <AppTextInput
            label="Email"
            type="email"
            v-model="state.formData.email"
            :validator="v$.formData.email"
         />

         <AppPhoneInput
            label="Cell phone"
            v-model="state.formData.cellPhone"
            :validator="v$.formData.cellPhone"
         />

         <AppPhoneInput
            label="Office phone"
            v-model="state.formData.officePhone"
            :validator="v$.formData.officePhone"
         />

         <AppSelect
            label="Brand"
            v-model="state.formData.brandId"
            :validator="v$.formData.brandId"
            :options="props?.brands ?? []"
            option-value="id"
            option-label="name"
            emit-value
            map-options
         />

         <AppSelect
            label="User Groups"
            v-model="state.formData.userGroupIds"
            :options="props?.userGroups ?? []"
            option-value="id"
            option-label="groupName"
            emit-value
            map-options
            multiple
            use-chips
         />
      </div>

      <q-checkbox
         v-model="state.formData.active"
         label="Set as active ?"
         :error-message="v$.formData.active.$errors[0]?.$message"
         :error="v$.formData.active?.$error"
         left-label
      />

      <p v-if="state.formData.createdAt">
         Created on: {{ displayDateTime(state.formData.createdAt) }}
      </p>
      <p v-if="state.formData.updatedAt">
         Last Updated: {{ displayDateTime(state.formData.updatedAt) }}
      </p>

      <div class="tw-flex tw-flex-row tw-justify-end tw-space-x-3">
         <q-btn
            label="Submit"
            type="submit"
            color="primary"
         />
      </div>
   </q-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { User, Brand, UserGroup } from '@/types';
import { displayDateTime } from '@/utils/dates';

const props = defineProps<{
   initialData?: User;
   brands?: Brand[];
   userGroups?: UserGroup[];
}>();
const emit = defineEmits(['submit']);

const state = reactive({
   formData: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      cellPhone: '',
      officePhone: '',
      brandId: '',
      userGroupIds: [] as number[],
      active: false,
      createdAt: '',
      updatedAt: '',
   } as User,
});

const validationRules = {
   formData: {
      firstName: { required },
      lastName: { required },
      username: { required },
      email: { required, email },
      cellPhone: { required },
      officePhone: { required },
      brandId: { required },
      active: { required },
   },
};
const v$ = useVuelidate(validationRules, state);

if (props.initialData?.id) {
   state.formData = Object.assign(state.formData, props.initialData);
}

async function submit() {
   if (await v$.value.$validate()) {
      emit('submit', { ...state.formData });
   }
}
</script>
