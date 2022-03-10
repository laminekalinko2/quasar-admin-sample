import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from 'vue-router';

import { useUserStore } from '@/stores/userStore';

import MainLayout from '@/layouts/main-layout.vue';
import Error404 from '@/pages/error-404.vue';
import Dashboard from '@/pages/dashboard.vue';
import Login from '@/pages/login.vue';

// Idenfity & Access
import Settings from '@/pages/settings/index.vue';
import UserGroups from '@/pages/settings/user-group/user-groups.vue';
import Users from '@/pages/settings/user/users.vue';
import Brands from '@/pages/settings/brand/brands.vue';

const routes: RouteRecordRaw[] = [
   {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter() {
         const userStore = useUserStore();
         userStore.$reset();
      },
   },
   {
      path: '/admin',
      redirect: { name: 'admin.dashboard' },
      component: MainLayout,
      children: [
         {
            path: 'dashboard',
            name: 'admin.dashboard',
            component: Dashboard,
         },
         {
            path: 'settings',
            name: 'admin.settings',
            component: Settings,
            redirect: { name: 'admin.settings.users' },
            children: [
               {
                  path: 'users',
                  name: 'admin.settings.users',
                  component: Users,
               },
               {
                  path: 'user-groups',
                  name: 'admin.settings.user-groups',
                  component: UserGroups,
               },
               {
                  path: 'brands',
                  name: 'admin.settings.brands',
                  component: Brands,
               },
            ],
         },
         {
            path: 'alerts',
            name: 'admin.alerts',
            component: RouterView,
            children: [],
         },
      ],
   },

   // Always leave this as last one,
   // but you can also remove it
   {
      path: '',
      component: MainLayout,
      children: [{ path: '/:catchAll(.*)*', component: Error404 }],
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach((to, from) => {
   if (to.name != 'login') {
      const userStore = useUserStore();

      // you are not logged
      if (!userStore.isLogged) {
         return { name: 'login' };
      }
   }
});

export default router;
