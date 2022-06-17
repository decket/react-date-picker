import { CalendarArrayType } from './Calendar';
import { DateTime } from 'luxon';

export function buildCalendar(date: DateTime) {
  const a: CalendarArrayType = [];
  let startDay = date.startOf('month').startOf('week');
  const endDay = date.endOf('month').endOf('week');

  while (startDay.startOf("day") < endDay.startOf("day")) {
    a.push(
      Array(7)
        .fill(0)
        // eslint-disable-next-line no-loop-func
        .map(() => {
          const oldDay = startDay;
          startDay = startDay.plus({ day: 1 });
          return oldDay;
        })
    );
  }

  return a;
}