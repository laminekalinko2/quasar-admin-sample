import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import router from '@/router';

axios.defaults.params = {};

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_API_BASEURL as string,
   // withCredentials: true,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
});

// intercept request here
axiosInstance.interceptors.request.use(
   (request) => {
      const userStore = useUserStore();

      if (userStore.isLogged) {
         request.auth = {
            username: userStore.accessUser.email,
            password: userStore.accessToken,
         };
      }

      return request;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// intercept response here
axiosInstance.interceptors.response.use(
   (request) => {
      return request;
   },
   (error) => {
      if (error.response.status == 401) {
         router.push({ name: 'login' });
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;
