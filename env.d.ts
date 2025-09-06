declare global {
  interface ImportMeta {
    readonly env: { [key: string]: string | undefined };
  }
}

export {};

