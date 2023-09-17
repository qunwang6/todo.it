import { format, startOfMonth, endOfMonth, eachDayOfInterval, isPast } from 'date-fns';
import type { IDay, IMonth } from '@/types';

export function generateDays(months: Array<IMonth> | IMonth): Array<IDay> {
  if (!Array.isArray(months)) {
    months = [months];
  }

  const days: Array<IDay> = [];

  months.forEach((month) => {
    const firstDayOfMonth = startOfMonth(month.monthString);
    const lastDayOfMonth = endOfMonth(month.monthString);
    const allDaysOfMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

    const daysArray = allDaysOfMonth.map((day) => ({
      id: format(day, 'ddMMyyyy'),
      monthId: month.id,
      name: format(day, 'd MMMM (EEEE)'),
      year: format(day, 'yyyy'),
      isCurrent: format(day, 'd_MMMM') === format(new Date(), 'd_MMMM'),
      isPast: isPast(day) && format(day, 'd_MMMM') !== format(new Date(), 'd_MMMM'),
    }));

    days.push(...daysArray);
  });

  return days.reverse();
}
