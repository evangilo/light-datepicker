# Light Datepicker

> Ultra light and minimalist Datepicker with zero dependencies.

## Preview
![Screenshot](https://raw.githubusercontent.com/evangilo/light-datepicker/master/screenshots/datepicker.gif)


## Install
```
npm install light-datepicker --save
```

## Basic Usage

```HTML
// HTML
<link rel="stylesheet" type="text/css" href="node_modules/light-datepicker/dist/datepicker.min.css">

<script src="node_modules/light-datepicker/dist/datepicker.min.js"></script>
```

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

## Run Example
```
git clone https://github.com/evangilo/light-datepicker.git

npm install

npm start
```

Open url in your browser: http://localhost:8080/example/

License
Light Datepicker is released under the MIT License. See [LICENSE](https://github.com/evangilo/light-datepicker/blob/master/LICENSE.md) file for details.

## Browser Support

@TODO
