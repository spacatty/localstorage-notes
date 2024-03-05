// TODO: создать ScheduleStore и перенести
// туда весь релевантный функционал

import { defineStore } from "pinia";
import { ref, computed, watch, reactive } from "vue";
import ScheduleItem from "../types/ScheduleItem";

interface ScheduleItemGroup {
  label: string;
  items: Array<ScheduleItem>;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<null | Object>(null);

  const scheduleData = ref<Array<ScheduleItem> | null>(null);

  const loadScheduleData = () => {
    if (!localStorage.getItem("scheduleData")) {
      scheduleData.value = [];
    } else {
      // @ts-ignore
      scheduleData.value = JSON.parse(localStorage.getItem("scheduleData"));
    }
  };
  const saveScheduleData = () => {
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData.value));
  };

  const addSchedule = (schedule: ScheduleItem) => {
    return new Promise((resolve, reject) => {
      if (scheduleData.value == null) {
        scheduleData.value = [];
      }
      if (schedule.title.trim() == "") {
        reject(new Error("Не указано название"));
        return;
      }
      scheduleData.value.push(Object.freeze(schedule));
      resolve(true);
    });
  };

  const schedulesSortedByDate = computed<Array<ScheduleItem> | null>(() => {
    if (!scheduleData.value) {
      return null;
    }
    return scheduleData.value.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  const getGroupsFromScheduleItems = (
    data: Array<ScheduleItem>
  ): Array<ScheduleItemGroup> => {
    const groups: Array<ScheduleItemGroup> = [];
    data.forEach((item) => {
      const date = new Date(item.date);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();

      const groupIndex = groups.findIndex(
        (group) => group.label === `${month} ${year}`
      );

      if (groupIndex === -1) {
        groups.push({
          label: `${month} ${year}`,
          items: [item],
        });
      } else {
        groups[groupIndex].items.push(item);
      }
    });

    return groups;
  };

  const groupedSchedules = computed<Array<ScheduleItemGroup> | null>(() => {
    if (
      !schedulesSortedByDate.value ||
      schedulesSortedByDate.value.length == 0
    ) {
      return null;
    }

    return getGroupsFromScheduleItems(schedulesSortedByDate.value);
  });

  const filterQuery = ref<string>("");

  const filteredSortedSchedules = computed<null | Array<ScheduleItem>>(() => {
    if (scheduleData.value == null || scheduleData.value.length == 0) {
      return null;
    }

    if (
      schedulesSortedByDate.value == null ||
      schedulesSortedByDate.value.length == 0
    ) {
      return null;
    }

    if (filterQuery.value.trim() == "") {
      return schedulesSortedByDate.value;
    }

    return schedulesSortedByDate.value.filter((schedule: ScheduleItem) =>
      schedule.title.includes(filterQuery.value)
    );
  });

  const filteredGroupedSchedules = computed<null | Array<ScheduleItemGroup>>(
    () => {
      if (
        !filteredSortedSchedules.value ||
        filteredSortedSchedules.value.length == 0
      ) {
        return null;
      }

      return getGroupsFromScheduleItems(filteredSortedSchedules.value);
    }
  );

  const getScheduleDataLength = computed<number>(() =>
    scheduleData.value ? scheduleData.value.length : 0
  );

  return {
    user,
    scheduleData,
    schedulesSortedByDate,
    groupedSchedules,
    filterQuery,
    filteredSortedSchedules,
    filteredGroupedSchedules,
    addSchedule,
    getScheduleDataLength,
    saveScheduleData,
    loadScheduleData,
  };
});
