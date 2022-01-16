import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default ({ mode }) => {
   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

   return defineConfig({
      plugins: [
         vue({
            script: {
               refSugar: true,
            },
            template: { transformAssetUrls },
         }),
         quasar(),
      ],
      server: {
         host: process.env.VITE_HOST,
         port: process.env.VITE_PORT as unknown as number,
         hmr: {
            port: process.env.VITE_HMR_PORT as unknown as number,
         },
      },
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         },
      },
   });
};
