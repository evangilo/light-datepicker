import '../styles/datepicker.css'
import { getCalendarDates, prevMonth, nextMonth } from './date';
import { createNode, noop } from './util';

const LANGUAGE = 'en-US';
const WEEKDAYS = 'sun_mon_tur_wed_thu_fri_sat'.split('_');
const TEMPLATE = 
 `<div class="header">
    <div class="prev-month button"></div>
    <div class="title"></div>
    <div class="next-month button"></div>
  </div>
  <div class="weekdays"></div>
  <div class="calendar"></div>`;

function getCalendarTitle(date, language) {
  return date.toLocaleDateString(language, {
    month: 'long',
    year: 'numeric'
  });
}

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
    this.decorators = [];

    this.container = createNode('div', 'datepicker', this.options.template);
    this.container.addEventListener('click', e => this.onClickListener(e));
    
    this.setWeekDays(this.options.weekdays);
    this.drawCalendar(this.options.date);
  }

  setWeekDays(weekdays) {
    const elem = this.container.querySelector('.weekdays');
    elem.innerHTML = '';
    weekdays.forEach(weekday => elem.appendChild(createNode('span', 'weekday', weekday)));
  }
 
  setCurrentMonth(date) {
    this.currentMonth = date;
  }

  setTitle(date) {
    const title = this.container.querySelector('.title');
    title.innerText = this.options.getTitle(date, this.options.language);
  }

  setCalendarDates(date) {
    const dates = getCalendarDates(date);
    const calendar = this.container.querySelector('.calendar');
    calendar.innerHTML = '';
    dates.forEach(d => calendar.appendChild(createNode('span', 'calendar-date', d.getDate(), d)));
  }

  setDate(date) {
    this.options.date = date;
  }

  applyDecorators() {
    const nodes = this.container.querySelectorAll('.calendar-date');

    nodes.forEach(node => {
      this.decorators.forEach(decorator => {
        decorator.condition(node.value, this.options.date, this.currentMonth)
          ? node.classList.add(decorator.className)
          : node.classList.remove(decorator.className)
      });
    });
  }


  drawCalendar(date) {
    this.setCurrentMonth(date);
    this.setTitle(date);
    this.setCalendarDates(date);
    this.applyDecorators();
  }

  onDateClickListener(date) {
    this.options.date = date;
    this.container.dispatchEvent(new CustomEvent('OnClickDate', { detail: date }));
    this.applyDecorators();
  }

  onClickListener(event) {
    const events = {
      'calendar-date': (date) => this.onDateClickListener(date),
      'prev-month': () => this.drawCalendar(prevMonth(this.currentMonth)),
      'next-month': () => this.drawCalendar(nextMonth(this.currentMonth))
    };
    const key = Object.keys(events).find(k => event.target.classList.contains(k));
    (events[key] || noop)(event.target.value);
  };

  addDecorator(decorator) {
    this.decorators.push(decorator);
    this.applyDecorators();
  }
}

