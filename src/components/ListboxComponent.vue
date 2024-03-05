<script setup lang="ts">
import { ref } from "vue";
import ScheduleItem from "../types/ScheduleItem";
import Fieldset from "primevue/fieldset";
import ScrollPanel from "primevue/scrollpanel";
import InputText from "primevue/inputtext";

import { useUserStore } from "../stores/user";
import { useAppStore } from "../stores/app";
import { storeToRefs } from "pinia";
import EditDialog from "./EditDialog.vue";

const { showErrorToast, showSuccessToast, selectedScheduleReactive } =
  useAppStore();
const { isScheduleDialogVisible, selectedSchedule } = storeToRefs(
  useAppStore()
);

const {
  scheduleData,
  filterQuery,
  filteredGroupedSchedules,
  filteredSortedSchedules,
} = storeToRefs(useUserStore());

const editDialogRef = ref(null);

// TODO: report issue
// Нужно из-за багов primevue
const clearSelectedScheduleValue = () =>
  new Promise((resolve, reject) => {
    let _ = setInterval(() => {
      selectedSchedule.value = null;
      isScheduleDialogVisible.value = false;
    }, 0.1);
    setTimeout(() => {
      clearInterval(_);
      resolve(true);
    }, 50);
  });

const complete_schedule = async (schedule: ScheduleItem) => {
  await clearSelectedScheduleValue();
  showSuccessToast("Успешно", "Заметка помечена выполненной");
};

const modify_schedule = async (schedule: ScheduleItem) => {
  if (!scheduleData.value || scheduleData.value.length == 0) {
    return null;
  }
  scheduleData.value[scheduleData.value.indexOf(schedule)] = Object.freeze(
    selectedScheduleReactive
  );
  await clearSelectedScheduleValue();
  showSuccessToast("Успешно", "Заметка успешно изменена");
};

const delete_schedule = async (schedule: ScheduleItem) => {
  scheduleData.value?.splice(scheduleData.value?.indexOf(schedule), 1);

  await clearSelectedScheduleValue();
  showSuccessToast("Успешно", `Заметка "${schedule.title}" успешно удалена`);
};

const show_dialog = () => {
  isScheduleDialogVisible.value = true;
};

const set_selected_schedule = (schedule: ScheduleItem) => {
  selectedSchedule.value = schedule;
};
</script>

<template>
  <EditDialog
    ref="editDialogRef"
    @modify-schedule="modify_schedule"
    @delete-schedule="delete_schedule"
  />

  <div class="">
    <p v-if="filteredSortedSchedules" class="my-4">
      Всего заметок: {{ filteredSortedSchedules.length }}
    </p>
    <div class="relative w-full">
      <InputText
        class="relative w-full p-4"
        v-model="filterQuery"
        placeholder="Поиск по заметкам..."
      />
      <i class="absolute translate-y-1/2 pi pi-search right-4 top-3" />
    </div>

    <Fieldset
      v-for="(groupItem, index) in filteredGroupedSchedules"
      :key="index"
      :legend="groupItem.label"
      :toggleable="true"
      class="my-8"
    >
      <ScrollPanel class="w-full px-2 h-fit max-h-64">
        <div
          @click="set_selected_schedule(scheduleItem)"
          class="my-2 px-4 py-2 cursor-pointer hover:bg-[#262626]"
          v-for="(scheduleItem, index) in groupItem.items"
          :key="index"
        >
          <div class="flex items-center">
            <div
              @click="show_dialog"
              class="flex items-center justify-around flex-1 w-full"
            >
              <div class="flex-1 truncate">
                <p>{{ scheduleItem.title }}</p>
              </div>
              <p class="flex items-center ml-4 text-xs text-gray-500">
                {{
                  new Date(scheduleItem.date).toLocaleDateString("ru-RU", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
              </p>
            </div>
            <div class="flex actions">
              <div
                @click="complete_schedule(scheduleItem)"
                class="z-50 flex items-center justify-center px-2 py-2 ml-4"
              >
                <i
                  class="text-lg text-green-400 duration-75 ease-in-out pi pi-check hover:cursor-pointer hover:scale-125"
                ></i>
              </div>
              <div
                @click="delete_schedule(scheduleItem)"
                class="z-50 flex items-center justify-center px-1 py-2 ml-4"
              >
                <i
                  class="text-lg text-red-400 duration-75 ease-in-out pi pi-trash hover:cursor-pointer hover:scale-125"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </ScrollPanel>
    </Fieldset>
  </div>
</template>
