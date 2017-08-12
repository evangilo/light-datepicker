import '../styles/datepicker.css'
import { getCalendar } from './calendar-v2';
import { getCalendarDates, prevMonth, nextMonth, isSame } from './date';
import { createNode, noop } from './util';

const LANGUAGE = window.navigator.language;
const WEEKDAYS = 'sun_mon_tur_wed_thu_fri_sat'.split('_');
const TEMPLATE = 
 `<div class="header">
    <div class="prev-month button"></div>
    <div class="title"></div>
    <div class="next-month button"></div>
  </div>
  <div class="weekdays"></div>
  <div class="calendar"></div>`;

const doc = window.document;

function getCalendarTitle(date, language) {
  return date.toLocaleDateString(language, {
    month: 'long',
    year: 'numeric'
  });
}

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

export default class DatePickerV2 {
  constructor(options) {
    this.options = {
      date: new Date(),
      getTitle: getCalendarTitle,
      template: TEMPLATE,
      language: LANGUAGE,
      weekdays: WEEKDAYS
    };
    this.options = { ...this.options, ...options };
    this.currentMonth = this.options.date;
    this.decorators = [ todayDecorator, selectedDecorator, outCurrentMonthDecorator ];

    this.element = createNode('div', 'datepicker', this.options.template);
    this.element.addEventListener('click', e => this.onClickListener(e));
    
    this.updateCalendar(this.options.date);
    this.updateWeekDays(this.options.weekdays);
  }

  updateWeekDays(weekdays) {
    const elem = this.element.querySelector('.weekdays');
    weekdays.forEach(weekday => elem.appendChild(createNode('span', 'weekday', weekday)));
  }

  updateCalendar(date) {
    this.updateTitle(date);
    this.updateCalendarDates(date);
    this.applyDecorators();
  }

  updateCalendarDates(date) {
    const dates = getCalendarDates(date);
    const calendar = this.element.querySelector('.calendar');
    calendar.innerHTML = '';
    dates.forEach(d => calendar.appendChild(createNode('span', 'calendar-date', d.getDate(), d)));
  }

  updateTitle(date) {
    const title = this.element.querySelector('.title');
    title.innerText = this.options.getTitle(date, this.options.language);
  }

  updateCurrentMonth(date) {
    this.currentMonth = date;
    this.updateCalendar(date);
  }

  onClickListener(event) {
    const events = {
      'calendar-date': (date) => this.onDateClickListener(date),
      'prev-month': () => this.updateCurrentMonth(prevMonth(this.currentMonth)),
      'next-month': () => this.updateCurrentMonth(nextMonth(this.currentMonth))
    };
    const key = Object.keys(events).find(k => event.target.classList.contains(k));
    (events[key] || noop)(event.target.value);
  };

  onDateClickListener(date) {
    this.options.date = date;
    this.element.dispatchEvent(new CustomEvent('OnClickDate', { detail: date }));
  }

  addEventListener(eventName, callback) {
    this.element.addEventListener(eventName, callback);
  }

  addDecorator(decorator) {
    this.decorators.push(decorator);
    this.applyDecorators();
  }

  applyDecorators() {
    const nodes = this.element.querySelectorAll('.calendar-date');

    nodes.forEach(node => {
      this.decorators.forEach(decorator => {
        decorator.condition(node.value, this.options.date, this.currentMonth)
          ? node.classList.add(decorator.className)
          : node.classList.remove(decorator.className)
      });
    });
  }
}

