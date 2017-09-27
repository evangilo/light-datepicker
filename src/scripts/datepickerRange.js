import { DatePicker } from './datepicker';
import { disabledRangeDecorator, rangeDecorator } from './decorators';

export class DatePickerRange {

  constructor(options) {
    this.leftDatePicker = new DatePicker({ ...options, ...{ selector: options.leftSelector } });
    this.rightDatePicker = new DatePicker({ ...options, ...{ selector: options.rightSelector } });
    this.leftDatePicker.calendar.on('clickDate', (event) => this.onLeftSelectDate(event.detail));
    this.rightDatePicker.calendar.on('clickDate', (event) => this.onRightSelectDate(event.detail));

    this.rightDatePicker.parentElement.addEventListener('focus', e => this.leftDatePicker.hide());
    this.leftDatePicker.parentElement.addEventListener('focus', e => this.rightDatePicker.hide());

    this.setupDecorators();
  }

  onLeftSelectDate(date) {
    let leftDate = this.leftDatePicker.options.currentDate;
    let rightDate = this.rightDatePicker.options.currentDate;
    if (rightDate < leftDate) {
      this.rightDatePicker.options.currentMonth = leftDate;
      this.rightDatePicker.options.currentDate = leftDate;
      this.rightDatePicker.updateInputValue();
      this.rightDatePicker.draw();
    }
    this.leftDatePicker.hide();
    this.rightDatePicker.show();
  }

  onRightSelectDate(date) {
    this.rightDatePicker.hide(300);
  }

  setupDecorators() {
    const getStartDate = () => this.leftDatePicker.options.currentDate;
    const getEndDate = () => this.rightDatePicker.options.currentDate;
    const rangeDec = rangeDecorator(getStartDate, getEndDate);
    this.leftDatePicker.calendar.addDecorator(rangeDec);
    this.rightDatePicker.calendar.addDecorator(rangeDec);
    this.rightDatePicker.calendar.addDecorator(disabledRangeDecorator(() => this.leftDatePicker.options.currentDate));
  }
}
