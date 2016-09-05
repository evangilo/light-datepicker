const single = new datepicker.DatePicker({ selector: '#datepicker' });
const range = new datepicker.DatePickerRange({
    language: 'pt-BR',
    leftSelector: '#left-datepicker',
    rightSelector: '#right-datepicker',
    appendTo: '.jumbotron'
});

single.calendar.on('click', date => console.log('single', date));
range.leftDatePicker.calendar.on('click', date => console.log('left', date));
range.rightDatePicker.calendar.on('click', date => console.log('right', date));
