<script setup lang="ts">
import Toast from "primevue/toast";
import { usePrimeVue } from "primevue/config";
import { onMounted, watch } from "vue";
import { useUserStore } from "./stores/user";
import { storeToRefs } from "pinia";
import ScheduleItem from "./types/ScheduleItem";

const { loadScheduleData, saveScheduleData } = useUserStore();
const { scheduleData } = storeToRefs(useUserStore());

loadScheduleData();

const testLocale = () => {
  const primevue = usePrimeVue();
  if (!primevue.config.locale) {
    return;
  }
  primevue.config.locale.today = "Сегодня";
  primevue.config.locale.clear = "Очистить";
  primevue.config.locale.monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  primevue.config.locale.monthNamesShort = [
    "Янв",
    "Февр",
    "Март",
    "Апр",
    "Май",
    "Июнь",
    "Июль",
    "Авг",
    "Сент",
    "Окт",
    "Нояб",
    "Дек",
  ];
  primevue.config.locale.dayNames = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  primevue.config.locale.dayNamesShort = [
    "Вс",
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
  ];
  primevue.config.locale.dayNamesMin = [
    "Вс",
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
  ];

  primevue.config.locale.emptyMessage = "Нет доступных записей";
  primevue.config.locale.emptyFilterMessage = "Нет подходящих данных";
  primevue.config.locale.emptySearchMessage = "Нет подходящих данных";
};

const generateTestData = () => {
  const start = new Date(2012, 0, 1),
    end = new Date();

  for (let i = 0; i < 20; i++) {
    if (scheduleData.value == null) {
      scheduleData.value = [];
    }
    scheduleData.value?.push({
      id: i,
      title: `Заметка ${i + 1}`,
      date: new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      ),
    } as ScheduleItem);
  }
};

onMounted(() => {
  testLocale();
  loadScheduleData();

  if (!scheduleData.value) {
    scheduleData.value = [];
  }

  watch(scheduleData.value, (newValue, oldValue) => {
    saveScheduleData();
  });

  // generateTestData()
});
</script>

<template>
  <Toast />
  <router-view></router-view>
</template>
