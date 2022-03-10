<template>
   <setting-layout :menus="menus" title="Settings">
      <router-view />
   </setting-layout>
</template>

<script setup lang="ts">
import SettingLayout from '@/layouts/setting-layout.vue';
import { MenuItem } from '@/types';

const menus: MenuItem[] = [
   { to: { name: 'admin.settings.brands' }, label: 'Brands' },
   { to: { name: 'admin.settings.users' }, label: 'Users' },
   { to: { name: 'admin.settings.user-groups' }, label: 'User Groups' },
];
</script>
