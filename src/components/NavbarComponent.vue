<script setup lang="ts">
import { ref } from "vue";
import Menubar from "primevue/menubar";
import { type MenuItem } from "primevue/menuitem";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref<MenuItem[]>([
  {
    label: "Добавить",
    icon: "pi pi-plus",
    command: () => {
      router.push("/add");
    },
  },
  {
    label: "Список",
    icon: "pi pi-list",
    command: () => {
      router.push("/list");
    },
  },
]);
</script>

<template>
  <Menubar :model="items" class="items-center justify-center px-4"> </Menubar>
</template>
