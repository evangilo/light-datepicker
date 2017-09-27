import { isSame } from './date';

export const todayDecorator = () => ({
  shouldApply: (nodeDate) => isSame(nodeDate, new Date()),
  className: 'today'
});

export const outMonthDecorator = (cb) => ({
  shouldApply: (nodeDate) => !isSame(nodeDate, cb(), 'year month'),
  className: 'out-month'
});

export const thisMonthDecorator = (cb) => ({
  shouldApply: (nodeDate) => isSame(nodeDate, cb(), 'year month'),
  className: 'enabled'
});

export const selectedDecorator = (cb) => ({
  shouldApply: (nodeDate) => isSame(nodeDate, cb()),
  className: 'selected'
});

export const disabledRangeDecorator = (cb) => ({
  shouldApply: (nodeDate) => nodeDate < cb(),
  className: 'disabled'
});

export const rangeDecorator = (startCB, endCB) => ({
  shouldApply: (nodeDate) => nodeDate >= startCB() && nodeDate <= endCB(),
  className: 'range'
});
