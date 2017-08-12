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

document.body.appendChild(new datepicker.DatePickerV2().element)
