var single = new datepicker.DatePicker({ selector: '#datepicker' });
var range = new datepicker.DatePickerRange({
    language: 'pt-BR',
    leftSelector: '#left-datepicker',
    rightSelector: '#right-datepicker'
});

single.calendar.on('click', function(date) {
    console.log('single', date);
});
range.leftDatePicker.calendar.on('click', function(date) {
    console.log('left', date);
});
range.rightDatePicker.calendar.on('click', function(date) {
    console.log('right', date);
});