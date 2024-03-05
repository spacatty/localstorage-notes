import { defineStore } from "pinia";
import { ref, reactive } from "vue";

import { useToast } from "primevue/usetoast";
import ScheduleItem from "../types/ScheduleItem";

export const useAppStore = defineStore("app", () => {
  const toast = useToast();
  const getToast = () => toast;

  const showSuccessToast = (summary: string, detail: string) => {
    toast.add({
      severity: "success",
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const showErrorToast = (summary: string, detail: string) => {
    toast.add({
      severity: "error",
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const selectedSchedule = ref<null | ScheduleItem>(null);
  const selectedScheduleReactive = reactive({} as ScheduleItem);

  const isScheduleDialogVisible = ref<boolean>(false);
  return {
    getToast,
    showSuccessToast,
    showErrorToast,
    selectedSchedule,
    isScheduleDialogVisible,
    selectedScheduleReactive,
  };
});
