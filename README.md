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
          <td>events</td>
          <td>array</td>
          <td>[]</td>
          <td>components events, if should be as array with elem object link `{start_time: 1499684400, end_time: 1499688000, render: (cell, record) => {return (<span>{record.start_time}</span>); },
        },`</td>
        </tr>
        <tr>
          <td>value</td>
          <td>moment</td>
          <td>momnet()</td>
          <td>components value</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>Function</td>
          <td></td>
          <td>callback when value changed initiative</td>
        </tr>
        <tr>
          <td>className</td>
          <td>string</td>
          <td>''</td>
          <td>additional className at container</td>
        </tr>
        <tr>
          <td>rowHeight</td>
          <td>number</td>
          <td>60</td>
          <td>change row Height whth this props</td>
        </tr>
        <tr>
          <td>colSpan</td>
          <td>number</td>
          <td>30</td>
          <td>event cell colSpan when rotate</td>
        </tr>
        <tr>
          <td>prefixCls</td>
          <td>string</td>
          <td>rc-week-schedule</td>
          <td>compoments prefixCls class</td>
        </tr>
        <tr>
          <td>direction</td>
          <td>string</td>
          <td>normal</td>
          <td>'rotate' or 'normal'</td>
        </tr>
        <tr>
          <td>showLine</td>
          <td>boolen</td>
          <td>true</td>
          <td>compoments table line segmentation</td>
        </tr>
        <tr>
          <td>header</td>
          <td>function</td>
          <td>`(value) => {
      return (<h3>{value.format('YYYY-MM-DD')}</h3>);
    }`</td>
          <td>compoments header render func</td>
        </tr>
        <tr>
          <td>dayLabelFormat</td>
          <td>function</td>
          <td>`(day) => {
      return <div>{day.format('ddd')}<br />{day.format('MM-DD')}</div>;
    }`</td>
          <td>compoments dayLabelFormat render func</td>
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
