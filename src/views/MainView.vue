<script setup lang="ts">
import { ref } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
</script>

<template>
  <NavbarComponent />
  <div class="container px-8 py-8 mx-auto text-center">
    <p class="my-2">Авторизация не требуется.</p>
    <p class="my-2">Используйте меню навигации.</p>
    <p class="my-2">
      Для редактированияи или удаления заметки, кликните на её название в списке
      или воспользуйтесь подходящей иконкой.
    </p>
  </div>
</template>
../components/NavbarComponent.vue
