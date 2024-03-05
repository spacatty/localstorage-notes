<script setup lang="ts">
import ScheduleForm from "../components/ScheduleForm.vue";
import { reactive } from "vue";
import ScheduleItem from "../types/ScheduleItem";
import { useAppStore } from "../stores/app";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import NavbarComponent from "../components/NavbarComponent.vue";

const { showErrorToast, showSuccessToast } = useAppStore();
const { addSchedule } = useUserStore();
const {} = storeToRefs(useAppStore());
const { getScheduleDataLength } = storeToRefs(useUserStore());

// TODO: перенести в appStore
const newSchedule = reactive({
  id: getScheduleDataLength.value,
  title: "",
  place: "",
  notes: "",
  date: new Date(),
} as ScheduleItem);

const save_schedule = async () => {
  try {
    await addSchedule(newSchedule);
    showSuccessToast("Успешно", "Заметка успешно добавлена");
  } catch (error) {
    showErrorToast("Ошибка", error);
  }
};
</script>

<template>
  <NavbarComponent />
  <div class="container px-8 py-8 mx-auto">
    <p class="my-4 font-semibold text-xl">Добавить заметку</p>
    <form @submit.prevent="save_schedule" action="">
      <ScheduleForm class="my-8" v-model="newSchedule" />
      <input
        class="px-2 py-2 bg-blue-500 cursor-pointer float-end"
        type="submit"
        value="Сохранить"
      />
    </form>
  </div>
</template>
