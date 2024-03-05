<script setup lang="ts">
import ScheduleItem from "../types/ScheduleItem";
const model = defineModel<ScheduleItem>();

import { onMounted } from "vue";

import InputGroup from "primevue/inputgroup";
import Textarea from "primevue/textarea";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import CalendarComponent from "./CalendarComponent.vue";
</script>

<template>
  <div class="" v-if="model">
    <InputGroup class="my-4">
      <InputGroupAddon>
        <i class="pi pi-align-center"></i>
      </InputGroupAddon>
      <InputText
        required
        v-model="model.title"
        class="px-2 py-4"
        placeholder="Название"
      />
    </InputGroup>

    <InputGroup class="my-2">
      <InputGroupAddon>
        <i class="pi pi-globe"></i>
      </InputGroupAddon>
      <InputText v-model="model.place" class="px-2 py-4" placeholder="Место" />
    </InputGroup>

    <Textarea
      placeholder="Примечания"
      class="w-full px-4 py-4 my-2"
      v-model="model.notes"
      rows="5"
      cols="30"
    />

    <CalendarComponent v-model="model.date" class="my-2" />
  </div>
</template>
./CalendarComponent.vue
