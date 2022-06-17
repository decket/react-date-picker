import { useEffect, useState } from 'react';
import '../../assets/styles/Calendar/Calendar.scss';
import { DateTime } from 'luxon';
import { buildCalendar } from './build';
import { LeftArrow } from './Icons/LeftArrow';
import { RightArrow } from './Icons/RightArrow';
import { CloseIcon } from './Icons/CloseIcon';

export type CalendarArrayType = Array<Array<DateTime>>;

const Weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface CalendarProps {
  type: 'single' | 'range',
}

export const Calendar: React.FC<CalendarProps> = ({ type }) => {
  const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now());
  const [calendar, setCalendar] = useState<CalendarArrayType>([]);

  const [firstSelectedDate, setFirstSelectedDate] = useState<DateTime | null>(null);
  const [secondSelectedDate, setSecondSelectedDate] = useState<DateTime | null>(null);

  useEffect(() => {
    clearDates();
  }, [type])

  useEffect(() => {
    setCalendar(buildCalendar(currentDate));
  }, [currentDate])

  function isSelected(date: DateTime) {
    return (firstSelectedDate && date.equals(firstSelectedDate)) ||
      (secondSelectedDate && date.equals(secondSelectedDate));
  }

  function notThisMonth(date: DateTime) {
    return currentDate.month !== date.month;
  }

  function rangeDirection(date: DateTime): 'left' | 'right' | null {
    if (firstSelectedDate && secondSelectedDate) {
      if (date.equals(firstSelectedDate))
        return firstSelectedDate.startOf("day") > secondSelectedDate.startOf('day') ? 'right' : 'left';
      else if (date.equals(secondSelectedDate))
        return secondSelectedDate.startOf("day") > firstSelectedDate.startOf('day') ? 'right' : 'left';
    }

    return null;
  }

  function isDateInRange(date: DateTime): boolean {
    if (firstSelectedDate && secondSelectedDate && !firstSelectedDate.equals(secondSelectedDate)) {
      if (firstSelectedDate.startOf("day") < secondSelectedDate.startOf("day"))
        return firstSelectedDate.startOf("day") < date.startOf("day") && secondSelectedDate.startOf("day") > date.startOf("day");
      else
        return secondSelectedDate.startOf("day") < date.startOf("day") && firstSelectedDate.startOf("day") > date.startOf("day");

    } else return false;
  }

  function changeMonth(a: 1 | -1) {
    setCurrentDate(currentDate.plus({ month: a }));
  }

  function handleSelectDay(event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: DateTime) {
    if (firstSelectedDate === null) {
      setFirstSelectedDate(date);
    } else if (secondSelectedDate === null && type === 'range') {
      if (date.equals(firstSelectedDate)) return;

      setSecondSelectedDate(date);
    } else {
      setFirstSelectedDate(date);
      setSecondSelectedDate(null);
    }

    setCurrentDate(date);
  }

  function clearDates() {
    setFirstSelectedDate(null);
    setSecondSelectedDate(null);
  }

  return (
    <section className='Calendar-workplace'>
      <div className="header-container">
        {firstSelectedDate ? (<div className="dateBlock">{firstSelectedDate.toFormat('dd-MM-yyyy')}</div>) : null}
        {secondSelectedDate ? (<div className="horizontalLine"></div>) : null}
        {secondSelectedDate ? (<div className="dateBlock">{secondSelectedDate.toFormat('dd-MM-yyyy')}</div>) : null}

        <div className='closeIcon' onClick={clearDates}>
          <CloseIcon />
        </div>
      </div>

      <div className='calendar-container'>
        <div className='month-container'>
          <LeftArrow onClick={() => changeMonth(-1)} />
          <span className='currentMonth'>{currentDate.toFormat('LLLL yyyy')}</span>
          <RightArrow onClick={() => changeMonth(1)} />
        </div>

        <div className="weekdays-container">
          {Weekdays.map(day => (
            <div className='week-day' key={`day-${day}`}>{day}</div>
          ))}
        </div>
        <div className='calendar'>
          {calendar.map((week, index) => (
            <div className="week" key={`week-${index}`}>
              {week.map(date => {
                return (
                  <div
                    key={`${date.year}-${date.month}-${date.day}`}
                    date-year={date.year}
                    date-month={date.month}
                    date-day={date.day}
                    className={
                      `date` +
                      (isSelected(date) ? ' selected' : '') +
                      (isSelected(date) && rangeDirection(date) ? ' rangeDirection-' + (rangeDirection(date)) : '') +
                      (isDateInRange(date) ? ' inRange' : '') +
                      (notThisMonth(date) ? ' notCurrentMonth' : '')
                    }
                    onClick={(e) => handleSelectDay(e, date)}
                  >
                    <span>{date.day}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};