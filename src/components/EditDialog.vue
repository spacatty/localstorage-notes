<script setup lang="ts">
import { watch, ref, reactive, onMounted } from "vue";
import Dialog from "primevue/dialog";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/app";
import ScheduleForm from "./ScheduleForm.vue";

const { isScheduleDialogVisible, selectedSchedule } = storeToRefs(
  useAppStore()
);
const { selectedScheduleReactive } = useAppStore();

defineEmits(["deleteSchedule", "modifySchedule"]);

onMounted(() => {
  watch(isScheduleDialogVisible, (newValue, oldValue) => {
    if (newValue) {
      if (!selectedSchedule.value) {
        setTimeout(() => {
          if (selectedSchedule.value) {
            Object.assign(selectedScheduleReactive, selectedSchedule.value);
          }
        }, 100);
      }
    }
  });
});
</script>

<template>
  <Dialog
    v-model:visible="isScheduleDialogVisible"
    modal
    :header="selectedSchedule?.title"
    class="w-full max-w-[600px]"
  >
    <ScheduleForm
      v-if="selectedScheduleReactive"
      v-model="selectedScheduleReactive"
    />

    <div class="flex justify-end w-full mt-4" v-if="selectedSchedule">
      <div
        class="px-2 py-2 text-red-500 duration-150 cursor-pointer hover:bg-red-500 hover:text-white"
        @click="isScheduleDialogVisible = false"
      >
        <span
          @click="$emit('deleteSchedule', selectedSchedule)"
          class="flex items-center"
        >
          <i class="pi pi-trash" />
          <p class="ml-2">Удалить</p>
        </span>
      </div>

      <div
        class="px-2 py-2 ml-2 duration-150 bg-green-600 cursor-pointer"
        @click="isScheduleDialogVisible = false"
      >
        <span
          @click="$emit('modifySchedule', selectedSchedule)"
          class="flex items-center"
        >
          <i class="pi pi-check" />
          <p class="ml-2">Сохранить</p>
        </span>
      </div>
    </div>
  </Dialog>
</template>
