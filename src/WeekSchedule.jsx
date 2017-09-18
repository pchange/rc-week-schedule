import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

class WeekSchedule extends Component {
  static propTypes = {
    // 方向，只有两个，为 normal 和 rotate
    direction: PropTypes.string,
    // 时间表的 value 值。
    value: PropTypes.array,
    // 正常方向时候，每一行高度。
    rowHeight: PropTypes.number,
    // 翻转时候的每个 cell 的 colSpan 。
    colSpan: PropTypes.number,
    // value 变化之后的回调。
    onChange: PropTypes.func,
    // 时间表抬头的 label 的 format 方法。
    dayLabelFormat: PropTypes.func,
    // 时间表的事件。
    events: PropTypes.array,
    // 渲染 header
    header: PropTypes.func,
    // 是否显示表格里面的时间分割线。
    showLine: PropTypes.bool,
  };

  static defaultProps = {
    prefixCls: 'rc-week-schedule',
    value: moment(),
    events: [],
    showLine: true,
    // direction: 'rotate',
    direction: 'normal',
    rowHeight: 60,
    colSpan: 30,
    header: (value) => {
      return (<h3>{value.format('YYYY-MM-DD')}</h3>);
    },
    dayLabelFormat: (day) => {
      return <div>{day.format('ddd')}<br />{day.format('MM-DD')}</div>;
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      // 方向，默认 normal
      // direction: props.direction,
      // 日历当前的值，显示这周的日期。
      value: props.value,
      // 每行的高度
      rowHeight: props.rowHeight,
      // 存储这一周每一天的数据，详情看看内存即可。
      weekFolder: [],
      // 开始显示时间。
      minHour: 6,
      // 结束显示时间。
      maxHour: 22,
      // 每个时间的间隔。
      hourStep: 1,
      // 一周开始的时间
      weekStart: 1,
      // 一周结束的时间
      weekEnd: 7,
      minuteHeight: 1,
      colSpan: props.colSpan,
    };
    // 每分钟的高度，这个根据 rowHeight ， hourStep 计算出来，计算公式是
    this.state.minuteHeight = this.state.rowHeight / (60 * this.state.hourStep);
    // 每分钟的 colSpan ，这个根据 rowHeight ， hourStep 计算出来，计算公式是
    this.state.minuteColSpan = this.state.colSpan / (60 * this.state.hourStep);
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
    this.countData();
    this.countMinuteHeight();
    this.countMinuteColSpan();
  }

  // 更新传输的 value
  componentWillReceiveProps = (nextProps) => {
    const newState = {};
    if ('value' in nextProps) {
      newState.value = nextProps.value;
    }

    if (!_.isEmpty(newState)) {
      this.setState(newState, () => {
        this.countData();
      });
    }
  }

  componentWillUnmount = () => {
  }

  onChange = () => {
    const { onChange } = this.props;
    const { value } = this.state;
    if ('function' === typeof onChange) {
      onChange(value);
    }
  }

  makeCellObj = ({ start, end, event }) => {
    const length = parseInt((end - start) / 60, 10);
    return {
      start,
      end,
      length,
      event,
      empty: !event,
    };
  }

  countData = () => {
    const dayLabelFormat = this.props.dayLabelFormat;
    const format = 'YYYY-MM-DD';
    const repeatValue = moment(this.state.value.format(format), format);
    const weekFolder = [];

    for (let i = this.state.weekStart; i <= this.state.weekEnd; i += 1) {
      const day = repeatValue.day(i);
      // 开始时间
      const dayStartUnix = day.unix();
      // 结束时间
      const dayEndUnix = dayStartUnix + (24 * 60 * 60);
      // 筛选所有 events 中该天的 event
      const dayEvents = _.sortBy(_.filter(this.props.events, (event) => {
        // 这天之前开始，之后结束。
        if (dayStartUnix > event.start_time && dayEndUnix < event.end_time) {
          return true;
        }
        // 这天之前就开始，这天结束。
        else if (dayStartUnix > event.start_time && dayStartUnix < event.end_time) {
          return true;
        }
        // 这天开始，这天结束。
        else if (dayStartUnix < event.start_time && dayEndUnix > event.end_time) {
          return true;
        }
        // 这天开始，这天之后结束。
        else if (dayEndUnix > event.start_time && dayEndUnix < event.end_time) {
          return true;
        }
        else {
          return false;
        }
      }), 'start_time');
      const startMinuteUnix = repeatValue.clone().hour(this.state.minHour).unix();
      let minuteUnixCount = startMinuteUnix;
      const endMinuteUnix = repeatValue.clone().hour(this.state.maxHour + this.state.hourStep).unix();
      const eventsCell = [];
      // 计算每个日期的 event cell 长度。
      _.each(dayEvents, (event) => {
        // 下面两个时间，会通过计算，不能超出当前这天的前后时间。
        let eventStartTime = event.start_time;
        let eventEndTime = event.end_time;

        if (eventStartTime < startMinuteUnix) {
          eventStartTime = startMinuteUnix;
        }
        if (eventStartTime < minuteUnixCount) {
          eventStartTime = minuteUnixCount;
        }
        if (eventEndTime > endMinuteUnix) {
          eventEndTime = endMinuteUnix;
        }
        if (eventEndTime < minuteUnixCount) {
          eventEndTime = minuteUnixCount;
        }

        if (minuteUnixCount < eventStartTime) {
          const emtryEventCell = this.makeCellObj({
            start: minuteUnixCount,
            end: eventStartTime,
          });
          minuteUnixCount = endMinuteUnix;
          eventsCell.push(emtryEventCell);
          minuteUnixCount = eventStartTime;
        }

        const eventCell = this.makeCellObj({
          start: minuteUnixCount,
          end: eventEndTime,
          event,
        });
        minuteUnixCount = eventEndTime;
        eventsCell.push(eventCell);
      });
      // 尾部如果空白，需要追加填充一个空白的事件。
      if (minuteUnixCount < endMinuteUnix) {
        // 尾部填充一个空白的日期。
        eventsCell.push(this.makeCellObj({
          start: minuteUnixCount,
          end: endMinuteUnix,
        }));
        minuteUnixCount = endMinuteUnix;
      }

      weekFolder.push({
        day: i,
        date: day.format('MM-DD'),
        dayStartUnix,
        dayEndUnix,
        events: dayEvents,
        eventsCell,
        label: dayLabelFormat(day),
      });
    }

    this.setState({
      weekFolder,
    });
  }

  countMinuteHeight = () => {
    // 每分钟的高度，这个根据 rowHeight ， hourStep 计算出来，计算公式是
    const minuteHeight = this.state.rowHeight / (60 * this.state.hourStep);
    this.setState({
      minuteHeight,
    });
  }

  countMinuteColSpan = () => {
    // 每分钟的高度，这个根据 colSpan ， 每 row 分钟数计算出来
    const minuteColSpan = this.state.colSpan / (60 * this.state.hourStep);
    this.setState({
      minuteColSpan,
    });
  }

  renderCell = (record) => {
    if (record.empty) {
      return null;
    }
    else if (record && record.event && record.event.render) {
      return record.event.render(record, record.event);
    }
  }


  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const state = this.state;
    const timeLabelArr = _.range(state.minHour, state.maxHour + state.hourStep, state.hourStep);

    return (<div className={`${prefixCls} ${prefixCls}-direction-${this.props.direction}`}>
      <style></style>

      {
        'rotate' === this.props.direction ? (<table cellPadding="0" cellSpacing="0" className={`${prefixCls}-table print-table`}>
          <tbody data-comment="注意不允许使用 thead">
            {
              'function' !== typeof this.props.header ? null : (<tr>
                <td colSpan={this.state.colSpan * (1 + timeLabelArr.length)}>
                  { this.props.header(state.value) }
                </td>
              </tr>)
            }
            <tr>
              <td colSpan={this.state.colSpan}>时间</td>
              {
                timeLabelArr.map((hour, hourIndex, hourArr) => {
                  const last = hourIndex === hourArr.length - 1;
                  return (<td colSpan={this.state.colSpan} key={`hourIndex_${hourIndex}`} style={{ height: state.rowHeight }} className={`${prefixCls}-time-detail ${last ? 'last' : ''}`}>
                    {hour}点
                  </td>);
                })
              }
            </tr>

            {
              state.weekFolder.map((day) => {
                const eventsCell = day.eventsCell;
                return (<tr key={day.date}>
                  <td colSpan={this.state.colSpan}>
                    { day.label }
                  </td>
                  {
                    eventsCell.map((cell, cellIndex) => {
                      const last = cellIndex === eventsCell.length - 1;
                      const colSpan = cell.length * state.minuteColSpan;
                      return (<td key={`weekIndex_${cellIndex}`} colSpan={colSpan}>
                        <div className={`${prefixCls}-time-detail ${last ? 'last' : ''} ${cell.empty ? '${prefixCls}-time-detail-empty' : '${prefixCls}-time-detail-full'}`}>
                          { this.renderCell(cell) }
                        </div>
                      </td>);
                    })
                  }

                </tr>);
              })
            }

          </tbody>
        </table>) : null
      }

      {
        'rotate' !== this.props.direction ? (<table cellPadding="0" cellSpacing="0" className={`${prefixCls}-table print-table`}>
          <tbody data-comment="注意不允许使用 thead">
            {
              'function' !== typeof this.props.header ? null : (<tr>
                <td colSpan={1 + state.weekFolder.length}>
                  { this.props.header(state.value) }
                </td>
              </tr>)
            }
            <tr>
              <td colSpan="1">时间</td>
              {
                state.weekFolder.map((day, index) => {
                  return (<td colSpan="1" key={index}>
                    { day.label }
                  </td>);
                })
              }
            </tr>

            <tr>
              <td colSpan="1" className={`${prefixCls}-cell-td`}>
                {
                  timeLabelArr.map((hour, hourIndex, hourArr) => {
                    const last = hourIndex === hourArr.length - 1;
                    return (<div key={`hourIndex_${hourIndex}`} style={{ height: state.rowHeight }} className={`${prefixCls}-time-detail ${last ? 'last' : ''}`}>
                      {hour}点
                    </div>);
                  })
                }
              </td>
              {
                state.weekFolder.map((day) => {
                  const eventsCell = day.eventsCell;
                  return (<td colSpan="1" key={day.date} className={`${prefixCls}-cell-td`}>
                    {
                      !this.props.showLine ? null : (<div className={`${prefixCls}-cell-column ${prefixCls}-bg-cell-column`}>
                        {
                          timeLabelArr.map((hour, hourIndex, hourArr) => {
                            const last = hourIndex === hourArr.length - 1;
                            return (<div key={`hourIndex_${hourIndex}`} style={{ height: state.rowHeight }} className={`${prefixCls}-time-detail ${last ? 'last' : ''}`} />);
                          })
                        }
                      </div>)
                    }

                    <div className={`${prefixCls}-cell-column`}>
                      {
                        eventsCell.map((cell, cellIndex) => {
                          const last = cellIndex === eventsCell.length - 1;
                          const height = cell.length * state.minuteHeight;
                          // eslint-disable-next-line
                          const className = `${prefixCls}-time-detail ` + (last ? 'last ' : ' ') + (cell.empty ? `${prefixCls}-time-detail-empty ` : `${prefixCls}-time-detail-full `);
                          return (<div key={`weekIndex_${cellIndex}`} style={{ height }} className={className}>
                            { this.renderCell(cell) }
                          </div>);
                        })
                      }
                    </div>
                  </td>);
                })
              }
            </tr>
          </tbody>
        </table>) : null
      }
    </div>);
  }
}

export default WeekSchedule;
