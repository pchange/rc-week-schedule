# rc-week-schedule
---

React SimpleSheet

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-week-schedule.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-week-schedule
[travis-image]: https://img.shields.io/travis/pchange/rc-week-schedule.svg?style=flat-square
[travis-url]: https://travis-ci.org/pchange/rc-week-schedule
[coveralls-image]: https://img.shields.io/coveralls/pchange/rc-week-schedule.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/pchange/rc-week-schedule?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/pchange/rc-week-schedule.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/pchange/rc-week-schedule
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-week-schedule.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-week-schedule

## Screenshot

<img src="https://raw.githubusercontent.com/pchange/rc-week-schedule/master/screenshot/weekschedule.jpeg" width="450"/>

## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8 + IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |


## Install

[![rc-week-schedule](https://nodei.co/npm/rc-week-schedule.png)](https://npmjs.org/package/rc-week-schedule)

## Usage

```js
var SimpleSheet = require('rc-week-schedule');
var React = require('react');
var ReactDOM = require('react-dom');
ReactDOM.render(<SimpleSheet />, container);
```

## Examples

`npm start` and then go to
[http://localhost:8000/examples](http://localhost:8000/examples)

Online examples: [http://pchange.github.io/rc-week-schedule/examples/](http://pchange.github.io/rc-week-schedule/examples/)

## API

### Props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>value</td>
          <td>array</td>
          <td>[]</td>
          <td>components value, if should be as array with elem object link `{row: 0,  column: 5, render: ({ record, row, column }) => {console.log('record', record, 'row', row, 'column', column); return (<div>value</div>); } }`</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>Function</td>
          <td></td>
          <td>callback when value changed initiative</td>
        </tr>
        <tr>
          <td>selectionCell</td>
          <td>array</td>
          <td>''</td>
          <td>components selectionCell value, if should be as array with elem object link `{row: 0,  column: 5}`</td>
        </tr>
        <tr>
          <td>onSelectionCellChange</td>
          <td>Function</td>
          <td></td>
          <td>callback when selectionCell changed initiative</td>
        </tr>
        <tr>
          <td>className</td>
          <td>string</td>
          <td>''</td>
          <td>additional className at container</td>
        </tr>
        <tr>
          <td>rows</td>
          <td>array</td>
          <td>[{label: 1, index: 1, }, {label: 2, index: 2, }, ],</td>
          <td>row define</td>
        </tr>
        <tr>
          <td>columns</td>
          <td>array</td>
          <td>[{label: 1, index: 1, }, {label: 2, index: 2, }, ],</td>
          <td>column define</td>
        </tr>
        <tr>
          <td>ySelect</td>
          <td>boolen</td>
          <td>true</td>
          <td>select cell when mouse draging y coordinate</td>
        </tr>
        <tr>
          <td>xSelect</td>
          <td>boolen</td>
          <td>true</td>
          <td>select cell when mouse draging x coordinate</td>
        </tr>
        <tr>
          <td>rowHeight</td>
          <td>number</td>
          <td>30</td>
          <td>change row Height whth this props</td>
        </tr>
        <tr>
          <td>cellWidth</td>
          <td>number</td>
          <td>50</td>
          <td>change cell Width whth this props</td>
        </tr>
        <tr>
          <td>labelCellWidth</td>
          <td>number</td>
          <td>50</td>
          <td>change label Cell Width whth this props</td>
        </tr>
        <tr>
          <td>selectedAppend</td>
          <td>boolen</td>
          <td>false</td>
          <td>if true, append selectionCell cell when click or drag. if false, recount selectionCell and abandon the old selection</td>
        </tr>
        <tr>
          <td>cellSelectClassName</td>
          <td>string</td>
          <td>''</td>
          <td>add className to selection Cell</td>
        </tr>
    </tbody>
</table>

## Development

```bash
npm install
npm start
```

## Test Case

```bash
npm test
npm run chrome-test
```

## Coverage

```bash
npm run coverage
```

## License

`rc-week-schedule` is released under the MIT license.
