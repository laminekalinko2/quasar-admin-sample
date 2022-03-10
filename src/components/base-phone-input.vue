<template>
   <q-input
      style="width: 380px; max-width: 400px"
      filled
      square
      lazy-rules
      clearable
      v-model="internalValue"
      :error-message="validator?.$errors[0]?.$message"
      :error="validator?.$error"
      mask="(###) ###-####"
      fill-mask="_"
   />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
   props: {
      modelValue: {
         type: [String, Number],
      },

      validator: {
         type: Object,
      },
   },

   emits: ['update:modelValue'],

   computed: {
      internalValue: {
         get: function () {
            return this.modelValue;
         },

         set: function (newValue: unknown) {
            this.$emit('update:modelValue', newValue);
         },
      },
   },
});
</script>
