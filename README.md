# Light Datepicker

> Ultra light and minimalist Datepicker with zero dependencies.

## Preview
![Screenshot](https://github.com/evangilo/datepicker/src/screenshot.gif)

## Basic Usage

```JS
// Javascript
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
```

```HTML
<!-- HTML DatePicker Structure -->
<div class="row">
    <div class="form-group">
        <label>DatePicker</label>
        <div class="input-group col-sm-2">
            <input class="form-control" type="text" id="datepicker">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-calendar"></span>
            </span>
        </div>
    </div>
</div>

<!-- HTML DatePicker Range Structure -->
<div class="row">
    <div class="form-group">
        <label>DatePickerRange</label>
        <div class="form-inline">
            <div class="input-group col-sm-2">
                <input class="form-control" type="text" id="left-datepicker">
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
            <div class="input-group col-sm-2">
                <input class="form-control" type="text" id="right-datepicker">
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
        </div>
    </div>
</div>

<script src="datepicker.min.js"></script>
```

## Run
```
git clone git@github.com:evangilo/datepicker.git

npm install

npm start
```

Open url in your browser: http://localhost:8080

License
Datepicker Light is released under the MIT License. See [LICENSE](https://github.com/evangilo/datepicker/LICENCESE.md) file for details.

## Browser Support

@TODO
