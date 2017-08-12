import { createNode } from './util';
import { nextMonth, prevMonth, startMonth, datesInMonth } from './date';

function getCalendarDates(date) {
  const month = datesInMonth(date);
  const leftPadding = startMonth(date).getDay() || 7;
  const paddingLeftItems = datesInMonth(prevMonth(date))
    .reverse()
    .slice(0, leftPadding)
    .reverse();
  const paddingRightItems = datesInMonth(nextMonth(date))
    .slice(0, 42 - leftPadding - month.length);
  return [...paddingLeftItems, ...month, ...paddingRightItems];
};

function createNodeListWithValues(tag, className, values) {
  return values.map(date => createNode(tag, className, date.getDate(), date));
};

export function getCalendar(year, month) {
  const dates = getCalendarDates(new Date(year, month));
  return createNodeListWithValues('span', 'calendar-date', dates);
};

