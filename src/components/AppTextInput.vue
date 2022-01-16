<template>
   <q-input
      style="width: 380px; max-width: 400px"
      filled
      square
      clearable
      lazy-rules
      v-model="internalValue"
      :error-message="validator?.$errors[0]?.$message"
      :error="validator?.$error"
   >
      <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
         <slot :name="slot" v-bind="{ ...scope }" />
      </template>
   </q-input>
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
