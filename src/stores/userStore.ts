import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
   state: () => {
      return {
         accessToken: '',
         accessUser: {
            email: '',
            firstName: '',
            lastName: '',
         },
      };
   },

   getters: {
      fullName: ({ accessUser }) => `${accessUser.firstName} ${accessUser.lastName}`,
      isLogged: ({ accessToken }) => Boolean('' + accessToken.trim()),
   },

   persist: true,
});
