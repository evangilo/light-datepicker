

// const single = new datepicker.DatePicker({ selector: '#datepicker' });
// const range = new datepicker.DatePickerRange({
//     language: 'pt-BR',
//     leftSelector: '#left-datepicker',
//     rightSelector: '#right-datepicker',
//     appendTo: '.jumbotron'
// });

// single.calendar.on('clickDate', event => console.log('single:date', event.detail));
// range.leftDatePicker.calendar.on('clickDate', event => console.log('left:date', event.detail));
// range.rightDatePicker.calendar.on('clickDate', event => console.log('right:date', event.detail));

const d = new datepicker.DatePicker({ language: 'pt-BR' });

d.addEventListener('OnClickDate', ({ detail }) => {
  console.log('OnClickDate', detail);
});

d.addEventListener('OnMouseOverDate', ({ detail }) => {
  console.log('OnMouseOverDate', detail);
});

document.body.appendChild(d.container);