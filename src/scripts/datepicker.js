import '../styles/datepicker.css';

import { reserve } from './util';
import { appendChildList, createDiv, createEvent, removeContent  } from './dom';
import {
  getWeekDayNames,
  getMonthName,
  nextMonth,
  prevMonth,
  calendarDays
} from './date';

const LANGUAGE = window.navigator.language;

const TEMPLATE =
 `<div class="header">
    <span class="prev"></span>
    <span class="title"></span>
    <span class="next"></span>
  </div>
  <div class="weekdays"></div>
  <div class="calendar"></div>`;

export class DatePicker {
  constructor(options) {
    const initialState = {
      date: new Date(),
      month: new Date(),
      language: LANGUAGE,
      template: TEMPLATE,
      className: 'datepicker'
    };
    this.options = { ...initialState, ...options };

    this.decorators = [];
  
    this.container = createDiv(this.options.className, this.options.template);
    this.addEventListener = this.container.addEventListener.bind(this.container);
    this.removeEventListener = this.container.removeEventListener.bind(this.container);
    
    this.setupCalendarNodes();
    this.setupListeners();
    this.draw();
  }

  setupCalendarNodes() {
    this.nodes = reserve(42).map(() => createDiv('day'));
    appendChildList(this.query('.calendar'), this.nodes);
  }

  setupListeners() {
    this.query('.prev').addEventListener('click', e => this.setMonth(prevMonth(this.options.month)));
    this.query('.next').addEventListener('click', e => this.setMonth(nextMonth(this.options.month)));
    this.query('.calendar').addEventListener('click', e => this.dispatchDateEvent('OnClickDate', e));
    this.query('.calendar').addEventListener('mouseover', e => this.dispatchDateEvent('OnMouseOverDate', e));
  }

  applyDecorators() {
    this.nodes.forEach(node => {
      this.decorators.forEach(d => {
        d.shouldApply(node.date)
        ? node.classList.add(d.className)
        : node.classList.remove(d.className)
      });
    });
  }

  setDate(date) {
    this.options.date = date;
    this.applyDecorators();
  }

  setCalendar(date) {
    const days = calendarDays(date);
    this.nodes.forEach((node, idx) => {
      node.innerText = days[idx].getDate();
      node.date = days[idx];
    });
    this.applyDecorators();
  }

  setWeekDays() {
    const weekdayNames = getWeekDayNames(this.options.language);
    const weekdays = this.query('.weekdays');
    removeContent(weekdays);
    appendChildList(weekdays, weekdayNames.map(w => createDiv('weekday', w)));
  }

  setTitle(date) {
    const year = date.getFullYear();
    const month = getMonthName(date, this.options.language);
    this.query('.title').innerText = `${year} ${month}`;
  }

  draw() {
    const month = this.options.month;
    this.setCalendar(month, this.decorators);
    this.setWeekDays();
    this.setTitle(month);
  }

  setMonth(date) {
    this.options.month = date;
    this.draw();
  }

  setDecorators(decorators) {
    this.decorators = decorators;
    this.applyDecorators();
  }

  addDecorators(decorators) {
    this.setDecorators([ ...this.decorators, ...decorators ]);
  }

  dispatchDateEvent(eventName, event) {
    if (this.query('.calendar') !== event.target.parentNode) {
      return;
    }
    if ('OnClickDate' === eventName) {
      this.setDate(event.target.date);
    }
    this.container.dispatchEvent(createEvent(eventName, { date: event.target.date }));
  }

  query(selector) {
    return this.container.querySelector(selector);
  }
}
