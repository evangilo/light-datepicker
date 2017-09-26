import { prevMonth, nextMonth } from './date';
import Calendar from './Calendar';
import Element from './Element';

const TEMPLATE =
 `<div class="header">
    <div class="prev-month"></div>
    <div class="start-title"></div>
    <div class="end-title"></div>
    <div class="next-month"></div>
  </div>`;

export default class DatePickerRange extends Element {
  constructor(date, month, locale) {
    super('datepicker-range', TEMPLATE);
    
    this.starDate = date || new Date();
    this.endDate = this.starDate;
    this.startMonth = month || new Date();
    this.endMonth = nextMonth(this.startMonth);
    
    this.left = new Calendar(this.startMonth, locale);
    this.right = new Calendar(this.endMonth, locale);
    this.appendChild(this.left.el);
    this.appendChild(this.right.el);

    this.addEventListenerTo('.prev-month', 'click', e => this.setMonth(prevMonth(this.startMonth), prevMonth(this.endMonth)));
    this.addEventListenerTo('.next-month', 'click', e => this.setMonth(nextMonth(this.startMonth), nextMonth(this.endMonth)));
    this.left.addEventListener('OnClickDate', e => this.setStartDate(e.detail));
    this.right.addEventListener('OnClickDate', e => this.setEndDate(e.detail));

    this.setMonth(this.startMonth, this.endMonth);
  }

  setMonth(start, end) {
    this.startMonth = start;
    this.endMonth = end;
    this.left.update(start);
    this.right.update(end);
    this.querySelector('.start-title').innerText = start.toLocaleDateString(this.locale, { year: 'numeric', month: 'long' });
    this.querySelector('.end-title').innerText = end.toLocaleDateString(this.locale, { year: 'numeric', month: 'long' });
  }

  setStartDate(date) {
    this.starDate = date;
    this.applyDecorators();
  }

  setEndDate(date) {
    this.endDate = date;
    this.applyDecorators();
  }

  applyDecorators() {
    this.left.applyDecorators();
    this.right.applyDecorators(); 
  }
}