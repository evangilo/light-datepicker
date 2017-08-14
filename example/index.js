const single = new datepicker.DatePicker({ selector: '#datepicker' });
const range = new datepicker.DatePickerRange({
    language: 'pt-BR',
    leftSelector: '#left-datepicker',
    rightSelector: '#right-datepicker',
    appendTo: '.jumbotron'
});

single.calendar.on('clickDate', event => console.log('single:date', event.detail));
range.leftDatePicker.calendar.on('clickDate', event => console.log('left:date', event.detail));
range.rightDatePicker.calendar.on('clickDate', event => console.log('right:date', event.detail));

const d = new datepicker.DatePickerV2();
d.addDecorator(datepicker.todayDecorator);
d.addDecorator(datepicker.outCurrentMonthDecorator);
d.addDecorator(datepicker.selectedDecorator);
document.body.appendChild(d.container)
