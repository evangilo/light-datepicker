var single = new datepicker.DatePicker({ selector: '#datepicker' });
var range = new datepicker.DatePickerRange({
    language: 'pt-BR',
    leftSelector: '#left-datepicker',
    rightSelector: '#right-datepicker',
    appendTo: '.jumbotron'
});

single.calendar.on('clickDate', function(event) {
    console.log('single', event);
});
range.leftDatePicker.calendar.on('clickDate', function(event) {
    console.log('left', event);
});
range.rightDatePicker.calendar.on('clickDate', function(event) {
    console.log('right', event);
});
