<template>
  <div class="rounded-md">
    <div
      :id="id"
      class="flex items-center p-3 lg:p-5 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer transition-all duration-300"
      :class="classes"
      @click="clickHandler"
    >
      <div
        v-if="isActive"
        class="shrink-0 w-3 h-3 lg:w-4 lg:h-4 mr-3 lg:mr-5 rounded-full bg-green-500"
      />

      <div class="flex items-end">
        <div class="text-base lg:text-xl font-semibold !leading-none lg:!leading-7">
          {{ title }}
        </div>
      </div>
    </div>

    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="grid gap-3 lg:gap-5 pt-3 lg:pt-5 pr-0 pb-3 lg:pb-5 lg:pl-5 w-full rounded-md"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface IProps {
  id?: string;
  title: string;
  isOpen?: boolean;
  isActive?: boolean;
  additionalClasses?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  isOpen: false,
  isActive: false,
});

defineEmits(['click']);

const isOpen = ref(props.isOpen);

const clickHandler = () => {
  isOpen.value = !isOpen.value;
};

const classes = computed(() => ({
  'opacity-30 z-0': !isOpen.value && !props.isActive,
  ...(props.additionalClasses ? { [props.additionalClasses]: true } : {}),
}));
</script>

<style scoped lang="scss">
.slide-up {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>
