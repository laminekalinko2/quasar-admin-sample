/// <reference types="vite/client" />

declare module '*.vue' {
   import { DefineComponent } from 'vue';
   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
   const component: DefineComponent<{}, {}, any>;
   export default component;
}

interface ImportMetaEnv extends Readonly<Record<string, string | number>> {
   // Only string type here to avoid hard to debug cast problems in your components!
   readonly VITE_APP_VERSION: string;
   readonly VITE_APP_BUILD_EPOCH: string;
   readonly VITE_HOST: string;
   readonly VITE_API_BASEURL: string;
   readonly VITE_PORT: number;
   readonly VITE_HMR_PORT: number;
}
interface ImportMeta {
   readonly env: ImportMetaEnv;
}
