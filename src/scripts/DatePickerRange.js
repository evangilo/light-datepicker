import DatePicker from './DatePicker';
import { disabledRangeDecorator, rangeDecorator } from './decorators';

export default class DatePickerRange {

  constructor(options) {
    this.leftDatePicker = new DatePicker({ ...options, ...{ selector: options.leftSelector } });
    this.rightDatePicker = new DatePicker({ ...options, ...{ selector: options.rightSelector } });
    this.leftDatePicker.calendar.addEventListener('OnClickDate', (event) => this.onLeftSelectDate(event.detail));
    this.rightDatePicker.calendar.addEventListener('OnClickDate', (event) => this.onRightSelectDate(event.detail));

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
      this.rightDatePicker._updateInputValue();
      this.rightDatePicker.draw();
    }
    this.leftDatePicker.hide();
    this.rightDatePicker.show();
  }

  onRightSelectDate(date) {
    this.rightDatePicker.hide(300);
  }

  setupDecorators() {
    const _rangeDecorator = rangeDecorator(
      () => this.leftDatePicker.options.date,
      () => this.rightDatePicker.options.date
    );
    this.rightDatePicker.calendar.addDecorator(disabledRangeDecorator(() => this.leftDatePicker.options.date));
    this.rightDatePicker.calendar.addDecorator(_rangeDecorator);
    this.leftDatePicker.calendar.addDecorator(_rangeDecorator);
  }
}
