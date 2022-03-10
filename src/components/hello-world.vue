<template>
   <h2 class="text-h4">
      {{ props.msg }}
   </h2>
</template>

<script setup lang="ts">
const props = defineProps<{
   msg: string;
   optionalProp?: number;
}>();
</script>
