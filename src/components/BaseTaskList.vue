<template>
  <div class="relative flex flex-col grow gap-5">
    <BaseAccordion
      v-for="month in months"
      :key="month.id"
      :title="month.name"
      :is-open="month.isCurrent"
      :is-active="month.isCurrent"
      additional-classes="sticky top-[72px] lg:top-20 z-40"
    >
      <BaseAccordion
        v-for="day in getDaysByMonthId(month.id)"
        :id="day.isCurrent ? 'current-day' : ''"
        :key="day.id"
        :title="`${day.number} ${day.name}`"
        :is-open="true"
        :is-active="day.isCurrent"
        additional-classes="sticky top-28 lg:top-36 z-20"
      >
        <BaseButton v-if="!day.isPast" @click="createTask(day.id)">
          Add task
          <template #rightIcon>
            <div class="ml-4">
              <v-icon name="hi-plus" />
            </div>
          </template>
        </BaseButton>

        <draggableComponent
          :list="tasks[day.id].items"
          :group="{ name: 'tasks', pull: null, put: !day.isPast }"
          class="grid gap-5"
          handle=".grab-handle"
          item-key="id"
          ghost-class="opacity-50"
          drag-class="drag"
          @start="drag = true"
          @end="drag = false"
          @change="onDragChange($event, day.id)"
        >
          <template #item="{ element }">
            <BaseTask :task="element" />
          </template>
        </draggableComponent>

        <BaseEmptyListMessage v-if="!tasks[day.id].items.length" message="No tasks for this day" />
      </BaseAccordion>
    </BaseAccordion>
  </div>
</template>

<script setup lang="ts">
import type { IOnDragChangeEvent } from '@/types';
import draggableComponent from 'vuedraggable';
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCalendarStore, useTasksStore } from '@/stores';
import BaseButton from '@/components/ui/controls/BaseButton.vue';
import BaseAccordion from '@/components/ui/BaseAccordion.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage.vue';
import BaseTask from '@/components/BaseTask.vue';

const calendarStore = useCalendarStore();
const tasksStore = useTasksStore();
const drag = ref<boolean>(false);
const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
const { tasks } = storeToRefs(tasksStore);
const { createTask, updateTask } = tasksStore;

onMounted(() => {
  const currentDayElement = document.getElementById('current-day');

  if (currentDayElement) {
    const numberOfAccordions = 2;
    const elementY = currentDayElement.getBoundingClientRect().top + window.scrollY;
    const offset = currentDayElement.getBoundingClientRect().height * numberOfAccordions;

    window.scroll({
      top: elementY - offset,
      behavior: 'smooth',
    });
  }
});

const onDragChange = (event: IOnDragChangeEvent, dayId: string) => {
  if (event.added) {
    const task = event.added.element;

    task.dayId = dayId;

    updateTask(task.id, task.dayId, 'dayId', dayId);
  }
};
</script>

<style scoped lang="scss">
.drag {
  position: relative;
  opacity: 50;
  z-index: 9999;
}
</style>
