<script setup lang="ts">
import NavbarComponent from "../components/NavbarComponent.vue";
import ListboxComponent from "../components/ListboxComponent.vue";
import { ref } from "vue";
</script>

<template>
  <NavbarComponent />
  <div class="container px-8 py-8 mx-auto">
    <ListboxComponent />
  </div>
</template>
