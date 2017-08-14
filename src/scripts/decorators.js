import { isSame } from './date';

const todayDecorator = {
  condition: (nodeDate) => isSame(nodeDate, new Date()),
  className: 'today'
};

const outCurrentMonthDecorator = {
  condition: (nodeDate, currentDate, currentMonth) => !isSame(nodeDate, currentMonth, 'year month'),
  className: 'out-month'
};

const selectedDecorator = {
  condition: (nodeDate, currentDate, currentMonth) => isSame(nodeDate, currentDate),
  className: 'selected'
};

export {
  todayDecorator,
  outCurrentMonthDecorator,
  selectedDecorator
}
