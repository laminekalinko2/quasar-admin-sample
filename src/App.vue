<template>
   <suspense>
      <router-view></router-view>
   </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
   name: 'App',
});
</script>
