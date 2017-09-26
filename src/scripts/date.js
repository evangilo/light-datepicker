export const nextMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1);

export const prevMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() - 1);

export const beginOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const endOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1,  0);

export const addDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export const subtractDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);

export function dateRange(start, end) {
  let dates = [];
  let curr = new Date(start);
  while (curr <= end) {
    dates.push(curr);
    curr = addDays(curr, 1);
  }
  return dates;
}

export const daysOfMonth = (date) =>
  dateRange(beginOfMonth(date), endOfMonth(date));

export function calendarDays(date) {
  const month = daysOfMonth(date);
  const padding = beginOfMonth(date).getDay() || 7;
  const left = daysOfMonth(prevMonth(date)).slice(padding * -1);
  const right = daysOfMonth(nextMonth(date)).slice(0, 42 - padding - month.length);
  return [...left, ...month, ...right];
}

export function getWeekDayNames(locale) {
  const now = new Date()
  const sunday = subtractDays(now, now.getDay());
  const saturday = addDays(sunday, 6)
  return dateRange(sunday, saturday).map(d => d.toLocaleDateString(locale, { weekday: 'short' }));
}

export const getMonthName = (date, locale) =>
  date.toLocaleDateString(locale, { month: 'long' }); 

export function isSame(date, other, filter='year month day') {
  return (date && other) &&
    (!filter.includes('year') || date.getFullYear() === other.getFullYear()) &&
    (!filter.includes('month') || date.getMonth() === other.getMonth()) &&
    (!filter.includes('day') || date.getDate() === other.getDate());
}