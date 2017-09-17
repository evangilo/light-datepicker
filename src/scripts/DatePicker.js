import Calendar from './Calendar';
import Element from './Element';
import { prevMonth, nextMonth } from './date';
import '../styles/datepicker.css';

const TEMPLATE =
 `<div class="header">
    <span class="prev-month"></span>
    <span class="title"></span>
    <span class="next-month"></span>
  </div>`;

export default class DatePicker extends Element {
  constructor(date, month, locale) {
    super('datepicker', TEMPLATE);
    this.date = date || new Date();
    this.month = month || new Date();
    this.locale = locale;
    this.calendar = new Calendar(this.month, this.locale);

    this.setMonth(this.month);
    this.appendChild(this.calendar.el);
    this.addEventListenerTo('.prev-month', 'click', e => this.setMonth(prevMonth(this.month)));
    this.addEventListenerTo('.next-month', 'click', e => this.setMonth(nextMonth(this.month)));
    this.calendar.addEventListener('OnClickDate', e => this.setDate(e.detail));
  }

  setMonth(date) {
    this.month = date;
    this.calendar.update(date);
    this.querySelector('.title').innerText = date.toLocaleDateString(this.locale, { year: 'numeric', month: 'long' });
  }

  setDate(date) {
    this.date = date;
    this.calendar.applyDecorators();
  }
}
