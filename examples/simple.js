import React, { Component } from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import WeekSchedule from 'rc-week-schedule';
import 'rc-week-schedule/assets/index.less';

import $ from 'jquery';
window.$ = $;

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment('2017-07-12'),
      events: [
        {
          start_time: 1499684400,
          end_time: 1499688000,
          name: '小王',
          render: (cell, record) => {
            return (<span>{record.name}</span>);
          },
        },
        {
          start_time: 1499730800,
          end_time: 1499739400,
          name: '小刘',
          render: (cell, record) => {
            return (<span>{record.name}</span>);
          },
        },
        {
          start_time: 1499835400,
          end_time: 1499849500,
          name: '小谢',
          render: (cell, record) => {
            return (<span>{record.name}</span>);
          },
        },
        {
          start_time: 1499930000,
          end_time: 1499937000,
          name: '小航',
          render: (cell, record) => {
            return (<span>{record.name}</span>);
          },
        },
        {
          start_time: 1500025000,
          end_time: 1500030000,
          name: '小张',
          render: (cell, record) => {
            return (<span>{record.name}</span>);
          },
        },
        {
          start_time: 1500035000,
          end_time: 1500082000,
          name: '跨时间的老王',
          render: (cell, record) => {
            return (<span>{record.name}</span>);
          },
        },
      ],
    };
  }

  render() {
    const sheetProps = {
      value: this.state.value,
      events: this.state.events,
      onChange: (value) => {
        this.setState({
          value,
        });
      },
      rowHeight: 40,
      showLine: true,
      direction: 'normal',
    };
    return (<div>
      <div style={{ width: '100%', margin: '100px auto', textAlign: 'center' }}>
        <WeekSchedule {...sheetProps} />
      </div>
    </div>);
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'));
