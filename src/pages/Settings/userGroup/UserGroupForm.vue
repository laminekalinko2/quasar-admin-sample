<template>
   <q-form @submit.prevent="submit" class="tw-space-y-5">
      <AppTextInput
         label="Group Name"
         v-model="state.formData.groupName"
         :validator="v$.formData.groupName"
      />
      <AppTextInput
         type="textarea"
         rows="3"
         label="Description"
         v-model="state.formData.description"
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
import { required } from '@vuelidate/validators';
import { UserGroup } from '@/types';
import { displayDateTime } from '@/utils/dates';

const props = defineProps<{
   initialData?: UserGroup;
}>();
const emit = defineEmits(['submit']);

const state = reactive({
   formData: {
      groupName: '',
      description: '',
      createdAt: '',
      updatedAt: '',
   } as UserGroup,
});

const validationRules = {
   formData: {
      groupName: { required },
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
