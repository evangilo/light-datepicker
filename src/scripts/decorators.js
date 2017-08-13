import { isSame } from './date';

const todayDecorator = {
  condition: (date) => isSame(date, new Date()),
  className: 'today'
};

const outCurrentMonthDecorator = {
  condition: (date, currentDate, currentMonth) => !isSame(date, currentMonth, 'year month'),
  className: 'out-month'
};

const selectedDecorator = {
  condition: (date, currentDate, currentMonth) => isSame(date, currentDate),
  className: 'selected'
};

