

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // ovde dodaj i ostale env varijable ako ih imaš
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}