# Light Datepicker

> Ultra light and minimalist Datepicker with zero dependencies.

## Preview
![Screenshot](https://raw.githubusercontent.com/evangilo/light-datepicker/master/screenshots/datepicker.gif)


## Install
```
npm install light-datepicker
```

## Basic Usage

```JS
// Javascript
const single = new datepicker.DatePicker({ selector: '#datepicker' });

const range = new datepicker.DatePickerRange({
    leftSelector: '#left-datepicker',
    rightSelector: '#right-datepicker',
});

single.calendar.on('clickDate', event => console.log('single:date', event.detail));
range.leftDatePicker.calendar.on('clickDate', event => console.log('left:date', event.detail));
range.rightDatePicker.calendar.on('clickDate', event => console.log('right:date', event.detail));
```

## Run
```
git clone git@github.com:evangilo/datepicker.git

npm install

npm start
```

Open url in your browser: http://localhost:8080

License
Light Datepicker is released under the MIT License. See [LICENSE](https://github.com/evangilo/datepicker/LICENCESE.md) file for details.

## Browser Support

@TODO
