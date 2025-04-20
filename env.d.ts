declare global {
  interface ImportMeta {
    readonly env: {
      REACT_APP_API_URL?: string;
    };
  }
}

export {};
