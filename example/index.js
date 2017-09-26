const single = new datepicker.DatePicker({ selector: '#datepicker' });
single.calendar.addEventListener('OnClickDate', e => console.log('OnClickDate', e.detail));
single.calendar.addEventListener('OnMouseOverDate', e => console.log('OnMouseOverDate', e.detail));

const range = new datepicker.DatePickerRange({
    language: 'pt-BR',
    leftSelector: '#left-datepicker',
    rightSelector: '#right-datepicker'
});
