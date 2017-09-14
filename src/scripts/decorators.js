import { isSame } from './date';

export const TodayDecorator = () => ({
	shouldApply: (nodeDate) => isSame(nodeDate, new Date()),
	className: 'today'
});

export const DisabledDecorator = (fn) => ({
	shouldApply: (nodeDate) => !isSame(nodeDate, fn.apply(), 'year month'),
	className: 'disabled'
});

export const SeletedDecorator = (fn) => ({
	shouldApply: (nodeDate) => isSame(nodeDate, fn.apply()),
	className: 'selected'
});
