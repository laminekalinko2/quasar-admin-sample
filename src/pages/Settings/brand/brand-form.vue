<template>
   <q-form @submit.prevent="submit" class="tw-space-y-5">
      <base-input
         label="Name"
         v-model="state.formData.name"
         :validator="v$.formData.name"
      />

      <base-input
         type="email"
         label="Email"
         v-model="state.formData.email"
         :validator="v$.formData.email"
      />

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
import { Brand } from '@/types';
import { displayDateTime } from '@/utils/dates';

const props = defineProps<{
   initialData?: Brand;
}>();
const emit = defineEmits(['submit']);

const state = reactive({
   formData: {
      name: '',
      email: '',
      active: false,
      createdAt: '',
      updatedAt: '',
   },
});

const validationRules = {
   formData: {
      name: { required },
      email: { required, email },
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
