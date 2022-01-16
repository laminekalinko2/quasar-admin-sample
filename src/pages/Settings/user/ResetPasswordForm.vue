<template>
   <q-form @submit.prevent="submit" class="tw-space-y-5">
      <AppTextInput
         type="password"
         label="Password"
         v-model="state.formData.password"
         :validator="v$.formData.password"
      />
      <AppTextInput
         type="password"
         label="Confirm Password"
         v-model="state.formData.confirmPassword"
         :validator="v$.formData.confirmPassword"
      />

      <div class="tw-mt-8 tw-flex tw-flex-row tw-justify-end">
         <q-btn
            label="Reset Password"
            type="submit"
            color="primary"
            icon="lock_reset"
         />
      </div>
   </q-form>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, sameAs, helpers } from '@vuelidate/validators';
const emit = defineEmits(['passwordReset']);

const state = reactive({
   formData: {
      password: '',
      confirmPassword: '',
   },
});

const validationRules = {
   formData: {
      password: { required },
      confirmPassword: {
         required,
         confirmPassword: helpers.withMessage(
            'Passwords do not match.',
            sameAs(computed(() => state.formData.password))
         ),
      },
   },
};
const v$ = useVuelidate(validationRules, state);

async function submit() {
   if (await v$.value.$validate()) {
      emit('passwordReset', { ...state.formData });
   }
}
</script>
