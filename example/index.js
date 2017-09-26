const single = new datepicker.DatePicker({ selector: '#datepicker' });
single.calendar.addEventListener('OnClickDate', e => console.log('OnClickDate', e.detail));
single.calendar.addEventListener('OnMouseOverDate', e => console.log('OnMouseOverDate', e.detail));

// document.querySelector('.container').innerHTML = '';
// document.querySelector('.container').appendChild(single.el);
