import '../styles/datepicker.css';
import { Calendar } from './calendar';
import { isSame, prevMonth, nextMonth } from './date';
import { createNode } from './util';

const LANGUAGE = window.navigator.language;
const WEEKDAYS = 'sun_mon_tue_wed_thu_fri_sat'.split('_');

export class DatePicker {

    constructor(options) {
        this.options = {
            currentDate: new Date(),
            language: 'en-Us',
            selector: null,
            updateInput: true,
            weekdays: WEEKDAYS
        };
        this.options = { ...this.options, ...options };
        this.options.currentMonth = Object.assign(this.options.currentDate);

        this.setupParentElement();
        this.updateInputValue();
        this.setupCalendar();
        this.setupDatePicker();
        this.draw();
        this.hide();
    }

    setupParentElement() {
        this.parentElement = document.querySelector(this.options.selector);
        this.parentElement.addEventListener('focus', event => this.show());
    }

    setupCalendar() {
        this.calendar = new Calendar(this.options.weekdays);
        this.calendar.addDecorator(date => !isSame(date, this.options.currentMonth, 'year month'), 'out-month');
        this.calendar.addDecorator(date => isSame(date, this.options.currentMonth, 'year month'), 'enabled');
        this.calendar.addDecorator(date => isSame(date, this.options.currentDate), 'selected');
        this.calendar.on('click', date => this.selectDate(date));
    }

    setupDatePicker() {
        let template = `<div class="arrow"></div>
                        <div class="header">
                            <span class="prev">&#8592;</span>
                            <span class="title"></span>
                            <span class="next">&#8594;</span>
                        </div>`
        this.datepicker = createNode('div', 'datepicker', template);
        this.datepicker.style.display = 'none';
        this.datepicker.appendChild(this.calendar.container);
        this.datepicker.querySelector('.prev').addEventListener('click', event => this.onClickPrevMonth());
        this.datepicker.querySelector('.next').addEventListener('click', event => this.onClickNextMonth());

        document.body.appendChild(this.datepicker);
        document.addEventListener('click', event => {
            let target = event.target;
            let isOutsideClick = this.isOpened &&
                                !this.parentElement.isEqualNode(target) &&
                                !this.datepicker.isEqualNode(target) &&
                                !this.datepicker.contains(target);
            if (isOutsideClick) {
                this.hide();
            }
        }, true);
    }

    show() {
        let parentOffset = this.parentElement.getBoundingClientRect();
        this.isOpened = true;
        this.datepicker.style.display = 'block';
        this.datepicker.style.top = `${parentOffset.top + 55}px`;
        this.datepicker.style.left = `${parentOffset.left}px`;
        this.calendar.applyDecorators();
    }

    hide(delay=0) {
        setTimeout(() => {
            this.isOpened = false;
            this.datepicker.style.display = 'none';
        }, delay);
    }

    selectDate(date) {
        if (isSame(date, this.options.currentMonth, 'year month')) {
            this.options.currentDate = date;
            this.updateInputValue();
            this.calendar.applyDecorators();
        }
    }

    updateInputValue() {
        if (!this.options.updateInput) {
            return;
        }
        let date = this.options
                       .currentDate
                       .toLocaleDateString(this.options.language, {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'numeric'
                        });
        this.parentElement.value = date;
    }

    onClickPrevMonth() {
        this.options.currentMonth = prevMonth(this.options.currentMonth);
        this.draw();
    }

    onClickNextMonth() {
        this.options.currentMonth = nextMonth(this.options.currentMonth);
        this.draw();
    }

    updateTitle() {
        let title = this.options
                        .currentMonth
                        .toLocaleDateString(this.options.language, {
                            month : 'long',
                            year : 'numeric'
                        });
        this.datepicker.querySelector('.title').innerText = title;
    }

    draw() {
        this.updateTitle();
        this.calendar.draw(this.options.currentMonth);
    }
}

export class DatePickerRange {

    constructor(options) {
        this.rightDateSelected = false;

        this.leftDatePicker = new DatePicker({ ...options, ...{ selector: options.leftSelector } });
        this.rightDatePicker = new DatePicker({ ...options, ...{ selector: options.rightSelector } });
        this.leftDatePicker.calendar.on('click', (date) => this.onLeftSelectDate(date));
        this.rightDatePicker.calendar.on('click', (date) => this.onRightSelectDate(date));

        this.rightDatePicker.parentElement.addEventListener('focus', e => this.leftDatePicker.hide());
        this.leftDatePicker.parentElement.addEventListener('focus', e => this.rightDatePicker.hide());

        this.setupDecorators();
    }

    onLeftSelectDate(date) {
        this.leftDatePicker.hide();
        this.rightDatePicker.show();
        if (this.rightDatePicker.options.currentDate <  this.leftDatePicker.options.currentDate) {
            this.rightDatePicker.selectDate(this.leftDatePicker.options.currentDate);
        }
    }

    onRightSelectDate(date) {
        this.rightDatePicker.hide(300);
        this.rightDateSelected = true;
    }

    setupDecorators() {
        let rangeDisableLeftDecorator = (date) => this.rightDateSelected &&
                                         date > this.rightDatePicker.options.currentDate;
        let rangeDisableRightDecorator = (date) => date < this.leftDatePicker.options.currentDate;
        let rangeDecorator = (date) => date >= this.leftDatePicker.options.currentDate &&
                                       date <= this.rightDatePicker.options.currentDate;
        this.leftDatePicker.calendar.addDecorator(rangeDisableLeftDecorator, 'disabled');
        this.rightDatePicker.calendar.addDecorator(rangeDisableRightDecorator, 'disabled');
        this.leftDatePicker.calendar.addDecorator(rangeDecorator, 'range');
        this.rightDatePicker.calendar.addDecorator(rangeDecorator, 'range');
    }
}
