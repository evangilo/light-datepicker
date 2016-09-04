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
