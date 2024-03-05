import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import "./style.css";

import "primevue/resources/themes/mdc-dark-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";

import { router } from "./router/index";

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, { unstyled: false })
  .use(ToastService)
  .use(pinia)
  .use(router)
  .component("Button", Button)
  .mount("#app");
