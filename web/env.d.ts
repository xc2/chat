/// <reference types="@rsbuild/core/types" />

declare global {
  interface Window {
    __SERVER_REGISTRATION?: Promise<ServiceWorkerRegistration>;
  }
}
