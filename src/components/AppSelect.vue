<template>
   <q-select
      style="max-width: 400px; width: 380px"
      filled
      square
      v-model="internalValue"
      :error-message="validator?.$errors[0]?.$message"
      :error="validator?.$error"
      transition-show="scale"
      transition-hide="scale"
   >
      <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
         <slot :name="slot" v-bind="{ ...scope }" />
      </template>
   </q-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
   props: {
      modelValue: {
         type: [String, Number, Array],
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
