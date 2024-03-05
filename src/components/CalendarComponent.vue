<script setup lang="ts">
import Calendar from "primevue/calendar";
import { ref, defineModel } from "vue";

const model = defineModel<
  string | Date | string[] | Date[] | undefined | null
>();
</script>

<template>
  <Calendar
    v-model="model"
    showButtonBar
    showIcon
    showTime
    hourFormat="24"
    :showOnFocus="false"
    placeholder="Дата и время"
    class="w-full px-4 py-4"
  >
    <!-- TODO: добавить возможность выбрать текущие дату и время -->
    <!-- <template #footer>test</template> -->
  </Calendar>
</template>
