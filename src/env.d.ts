/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_ENCRYPTED_QUERY_PARAM: string;
  readonly VITE_IV_SIZE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
