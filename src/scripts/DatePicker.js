import Calendar from './Calendar';
import Element from './Element';
import { prevMonth, nextMonth, getMonthName } from './date';
import { todayDecorator, outMonthDecorator, seletedDecorator } from './decorators';
import '../styles/datepicker.css';

const TEMPLATE =
 `<div class="header">
    <div class="prev"></div>
    <div class="title"></div>
    <div class="next"></div>
  </div>`;

export default class DatePicker extends Element {
  constructor(options) {
    super('datepicker', TEMPLATE);

    const initialState = {
      selector: null,
      date: new Date(),
      month: new Date(),
      locale: window.navigator.language
    };

    this.options = { ...initialState, ...options };
    this.calendar = new Calendar(this.month, this.locale);

    this.setMonth(this.options.month);
    this.appendChild(this.calendar.el);
    this.addEventListenerTo('.prev', 'click', e => this.setMonth(prevMonth(this.options.month)));
    this.addEventListenerTo('.next', 'click', e => this.setMonth(nextMonth(this.options.month)));

    this.calendar.addEventListener('OnClickDate', e => this.setDate(e.detail));
    this.calendar.addDecorator(todayDecorator());
    this.calendar.addDecorator(outMonthDecorator(() => this.options.month));
    this.calendar.addDecorator(seletedDecorator(() => this.options.date));

    this._setupParentElement();
    this._setupOutClick();
    this._appendToBody();
    this._updateInputDate(this.options.date);
  }

  setMonth(date) {
    this.options.month = date;
    this.calendar.update(date);
    const year = date.getFullYear();
    const monthName = getMonthName(date);
    this.querySelector('.title').innerText = `${year} ${monthName}`;
  }

  setDate(date) {
    this.options.date = date;
    this.calendar.applyDecorators();
    this._updateInputDate(date);
  }

  // FIXME (evangilo): move to Popover class
  show() {
    const parentOffset = this.parentElement.getBoundingClientRect();
    const topOffset = parentOffset.bottom + 10;
    const leftOffset = parentOffset.left;
    this.isOpened = true;
    this.el.style.cssText = `display: block; top: ${(topOffset)}px; left: ${leftOffset}px;`;
  }

  // FIXME (evangilo): move to Popover class
  hide(delay=0) {
    setTimeout(() => {
      this.isOpened = false;
      this.el.style.display = 'none';
    }, delay);
  }

  // FIXME (evangilo): move to Popover class
  _setupParentElement() {
    this.parentElement = document.querySelector(this.options.selector);
    this.parentElement.addEventListener('focus', e => this.show());
  }

  _updateInputDate(date) {
    this.parentElement.value = date.toLocaleDateString();
  }

  // FIXME (evangilo): move to Popover class
  _setupOutClick() {
    document.addEventListener('click', e => {
      const target = e.target;
      const isOutsideClick = this.isOpened &&
        !this.parentElement.isEqualNode(target) &&
        !this.el.isEqualNode(target) &&
        !this.el.contains(target);
      if (isOutsideClick) {
        this.hide();
      }
    }, true);
  }

  // FIXME (evangilo): move to Popover class
  _appendToBody() {
    this.hide();
    document.body.appendChild(this.el);
  }
}
