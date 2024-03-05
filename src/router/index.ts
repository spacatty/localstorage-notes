import { createRouter, createWebHistory } from "vue-router";

import MainView from "../views/MainView.vue";
import AddView from "../views/AddView.vue";
import ListView from "../views/ListView.vue";

const routes = [
  {
    path: "/",
    component: MainView,
  },
  {
    path: "/add",
    component: AddView,
  },
  {
    path: "/list",
    component: ListView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
