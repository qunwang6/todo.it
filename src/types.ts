import type { RemovableRef } from '@vueuse/core';

export interface ICommonState {
  isSidebarOpen: RemovableRef<boolean>;
  isActionMenuOpen: boolean;
}

export interface ICalendarState {
  months: Array<IMonth>;
  tasks: RemovableRef<Record<string, Record<'items', Array<ITask>>>>;
  currentEditingTask: ITask | null;
}

export interface IMonth {
  id: string;
  name: string;
  year: string;
  weeks: Array<IWeek>;
  isCurrent: boolean;
}

export interface IWeek {
  id: string;
  daysInterval: {
    start: string;
    end: string;
  };
  days: Array<IDay>;
  isCurrent: boolean;
  isPast: boolean;
  isLast: boolean;
}

export interface IDay {
  id: string;
  name: string;
  year: string;
  isCurrent: boolean;
  isPast: boolean;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  dayId: IDay['id'] | 'backlog';
}

export interface IOnDragChangeEvent {
  to: HTMLElement;
  added: {
    element: ITask;
  };
  removed: {
    element: ITask;
  };
}
