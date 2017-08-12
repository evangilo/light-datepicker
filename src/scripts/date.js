export function nextMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1);
}

export function prevMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() - 1);
}

export function startMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1,  0);
}

export function datesInMonth(date) {
  let length = {length: endMonth(date).getDate()};
  return Array.from(length, (_, day) => new Date(date.getFullYear(), date.getMonth(), day + 1));
}

export function isSame(date, other, filter='year month day') {
  if (!date || !other) return false;
  return (!filter.includes('year') || date.getFullYear() === other.getFullYear()) &&
    (!filter.includes('month') || date.getMonth() === other.getMonth()) &&
    (!filter.includes('day') || date.getDate() === other.getDate())
}

export function getCalendarDates(date) {
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

