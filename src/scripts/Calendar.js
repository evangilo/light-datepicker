import Element from './Element';
import { getWeekDayNames, calendarDays } from './date';
import { createDiv, createDivList } from './dom';

const createWeekDayNodeList = (locale) =>
  getWeekDayNames(locale).map(weekday => createDiv('weekday', weekday));

export default class Calendar extends Element {
  constructor(month, locale) {
    super('calendar');

    this._decorators = [];

    this._weekdays = createWeekDayNodeList(locale);
    this._nodes = createDivList('day', 42);
    this.appendChildList(this._weekdays);
    this.appendChildList(this._nodes);
    this.addEventListener('click', e => this.dispatchDateEvent('OnClickDate', e));
    this.addEventListener('mouseover', e => this.dispatchDateEvent('OnMouseOverDate', e));
    this.update(month || new Date());
  }

  update(date) {
    const days = calendarDays(date);
    this._nodes.forEach((node, i) => {
      node.innerText = days[i].getDate();
      node.date = days[i];
    });
    this.applyDecorators();
  }

  applyDecorators() {
    this._nodes.forEach(node => {
      this._decorators.forEach(d => {
        d.shouldApply(node.date)
        ? node.classList.add(d.className)
        : node.classList.remove(d.className)
      });
    });
  }

  addDecorator(decorator) {
    this._decorators.push(decorator);
    this.applyDecorators();
  }

  removeDecorator(decorator) {
    const idx = this._decorators.indexOf(decorator);
    if (idx !== -1) {
      this._decorators.splice(idx, 1);
    }
    this.applyDecorators();
  }

  dispatchDateEvent(eventName, e) {
    if (e.target.date instanceof Date) {
      this.dispatchEvent(eventName, e.target.date, true, true);
    }
  }
}
