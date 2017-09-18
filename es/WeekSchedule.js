import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

var WeekSchedule = function (_Component) {
  _inherits(WeekSchedule, _Component);

  function WeekSchedule(props) {
    _classCallCheck(this, WeekSchedule);

    var _this = _possibleConstructorReturn(this, (WeekSchedule.__proto__ || Object.getPrototypeOf(WeekSchedule)).call(this, props));

    _this.componentWillMount = function () {};

    _this.componentDidMount = function () {
      _this.countData();
      _this.countMinuteHeight();
      _this.countMinuteColSpan();
    };

    _this.componentWillReceiveProps = function (nextProps) {
      var newState = {};
      if ('value' in nextProps) {
        newState.value = nextProps.value;
      }

      if (!_.isEmpty(newState)) {
        _this.setState(newState, function () {
          _this.countData();
        });
      }
    };

    _this.componentWillUnmount = function () {};

    _this.onChange = function () {
      var onChange = _this.props.onChange;
      var value = _this.state.value;

      if ('function' === typeof onChange) {
        onChange(value);
      }
    };

    _this.makeCellObj = function (_ref) {
      var start = _ref.start,
          end = _ref.end,
          event = _ref.event;

      var length = parseInt((end - start) / 60, 10);
      return {
        start: start,
        end: end,
        length: length,
        event: event,
        empty: !event
      };
    };

    _this.countData = function () {
      var dayLabelFormat = _this.props.dayLabelFormat;
      var format = 'YYYY-MM-DD';
      var repeatValue = moment(_this.state.value.format(format), format);
      var weekFolder = [];

      var _loop = function _loop(i) {
        var day = repeatValue.day(i);
        // 开始时间
        var dayStartUnix = day.unix();
        // 结束时间
        var dayEndUnix = dayStartUnix + 24 * 60 * 60;
        // 筛选所有 events 中该天的 event
        var dayEvents = _.sortBy(_.filter(_this.props.events, function (event) {
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
                } else {
                  return false;
                }
        }), 'start_time');
        var startMinuteUnix = repeatValue.clone().hour(_this.state.minHour).unix();
        var minuteUnixCount = startMinuteUnix;
        var endMinuteUnix = repeatValue.clone().hour(_this.state.maxHour + _this.state.hourStep).unix();
        var eventsCell = [];
        // 计算每个日期的 event cell 长度。
        _.each(dayEvents, function (event) {
          // 下面两个时间，会通过计算，不能超出当前这天的前后时间。
          var eventStartTime = event.start_time;
          var eventEndTime = event.end_time;

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
            var emtryEventCell = _this.makeCellObj({
              start: minuteUnixCount,
              end: eventStartTime
            });
            minuteUnixCount = endMinuteUnix;
            eventsCell.push(emtryEventCell);
            minuteUnixCount = eventStartTime;
          }

          var eventCell = _this.makeCellObj({
            start: minuteUnixCount,
            end: eventEndTime,
            event: event
          });
          minuteUnixCount = eventEndTime;
          eventsCell.push(eventCell);
        });
        // 尾部如果空白，需要追加填充一个空白的事件。
        if (minuteUnixCount < endMinuteUnix) {
          // 尾部填充一个空白的日期。
          eventsCell.push(_this.makeCellObj({
            start: minuteUnixCount,
            end: endMinuteUnix
          }));
          minuteUnixCount = endMinuteUnix;
        }

        weekFolder.push({
          day: i,
          date: day.format('MM-DD'),
          dayStartUnix: dayStartUnix,
          dayEndUnix: dayEndUnix,
          events: dayEvents,
          eventsCell: eventsCell,
          label: dayLabelFormat(day)
        });
      };

      for (var i = _this.state.weekStart; i <= _this.state.weekEnd; i += 1) {
        _loop(i);
      }

      _this.setState({
        weekFolder: weekFolder
      });
    };

    _this.countMinuteHeight = function () {
      // 每分钟的高度，这个根据 rowHeight ， hourStep 计算出来，计算公式是
      var minuteHeight = _this.state.rowHeight / (60 * _this.state.hourStep);
      _this.setState({
        minuteHeight: minuteHeight
      });
    };

    _this.countMinuteColSpan = function () {
      // 每分钟的高度，这个根据 colSpan ， 每 row 分钟数计算出来
      var minuteColSpan = _this.state.colSpan / (60 * _this.state.hourStep);
      _this.setState({
        minuteColSpan: minuteColSpan
      });
    };

    _this.renderCell = function (record) {
      if (record.empty) {
        return null;
      } else if (record && record.event && record.event.render) {
        return record.event.render(record, record.event);
      }
    };

    _this.state = {
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
      colSpan: props.colSpan
    };
    // 每分钟的高度，这个根据 rowHeight ， hourStep 计算出来，计算公式是
    _this.state.minuteHeight = _this.state.rowHeight / (60 * _this.state.hourStep);
    // 每分钟的 colSpan ，这个根据 rowHeight ， hourStep 计算出来，计算公式是
    _this.state.minuteColSpan = _this.state.colSpan / (60 * _this.state.hourStep);
    return _this;
  }

  // 更新传输的 value


  _createClass(WeekSchedule, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var prefixCls = props.prefixCls;
      var state = this.state;
      var timeLabelArr = _.range(state.minHour, state.maxHour + state.hourStep, state.hourStep);

      return React.createElement(
        'div',
        { className: prefixCls + ' ' + prefixCls + '-direction-' + this.props.direction },
        React.createElement('style', null),
        'rotate' === this.props.direction ? React.createElement(
          'table',
          { cellPadding: '0', cellSpacing: '0', className: prefixCls + '-table print-table' },
          React.createElement(
            'tbody',
            { 'data-comment': '\u6CE8\u610F\u4E0D\u5141\u8BB8\u4F7F\u7528 thead' },
            'function' !== typeof this.props.header ? null : React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: this.state.colSpan * (1 + timeLabelArr.length) },
                this.props.header(state.value)
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: this.state.colSpan },
                '\u65F6\u95F4'
              ),
              timeLabelArr.map(function (hour, hourIndex, hourArr) {
                var last = hourIndex === hourArr.length - 1;
                return React.createElement(
                  'td',
                  { colSpan: _this2.state.colSpan, key: 'hourIndex_' + hourIndex, style: { height: state.rowHeight }, className: prefixCls + '-time-detail ' + (last ? 'last' : '') },
                  hour,
                  '\u70B9'
                );
              })
            ),
            state.weekFolder.map(function (day) {
              var eventsCell = day.eventsCell;
              return React.createElement(
                'tr',
                { key: day.date },
                React.createElement(
                  'td',
                  { colSpan: _this2.state.colSpan },
                  day.label
                ),
                eventsCell.map(function (cell, cellIndex) {
                  var last = cellIndex === eventsCell.length - 1;
                  var colSpan = cell.length * state.minuteColSpan;
                  return React.createElement(
                    'td',
                    { key: 'weekIndex_' + cellIndex, colSpan: colSpan },
                    React.createElement(
                      'div',
                      { className: prefixCls + '-time-detail ' + (last ? 'last' : '') + ' ' + (cell.empty ? '${prefixCls}-time-detail-empty' : '${prefixCls}-time-detail-full') },
                      _this2.renderCell(cell)
                    )
                  );
                })
              );
            })
          )
        ) : null,
        'rotate' !== this.props.direction ? React.createElement(
          'table',
          { cellPadding: '0', cellSpacing: '0', className: prefixCls + '-table print-table' },
          React.createElement(
            'tbody',
            { 'data-comment': '\u6CE8\u610F\u4E0D\u5141\u8BB8\u4F7F\u7528 thead' },
            'function' !== typeof this.props.header ? null : React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: 1 + state.weekFolder.length },
                this.props.header(state.value)
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '1' },
                '\u65F6\u95F4'
              ),
              state.weekFolder.map(function (day, index) {
                return React.createElement(
                  'td',
                  { colSpan: '1', key: index },
                  day.label
                );
              })
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '1', className: prefixCls + '-cell-td' },
                timeLabelArr.map(function (hour, hourIndex, hourArr) {
                  var last = hourIndex === hourArr.length - 1;
                  return React.createElement(
                    'div',
                    { key: 'hourIndex_' + hourIndex, style: { height: state.rowHeight }, className: prefixCls + '-time-detail ' + (last ? 'last' : '') },
                    hour,
                    '\u70B9'
                  );
                })
              ),
              state.weekFolder.map(function (day) {
                var eventsCell = day.eventsCell;
                return React.createElement(
                  'td',
                  { colSpan: '1', key: day.date, className: prefixCls + '-cell-td' },
                  !_this2.props.showLine ? null : React.createElement(
                    'div',
                    { className: prefixCls + '-cell-column ' + prefixCls + '-bg-cell-column' },
                    timeLabelArr.map(function (hour, hourIndex, hourArr) {
                      var last = hourIndex === hourArr.length - 1;
                      return React.createElement('div', { key: 'hourIndex_' + hourIndex, style: { height: state.rowHeight }, className: prefixCls + '-time-detail ' + (last ? 'last' : '') });
                    })
                  ),
                  React.createElement(
                    'div',
                    { className: prefixCls + '-cell-column' },
                    eventsCell.map(function (cell, cellIndex) {
                      var last = cellIndex === eventsCell.length - 1;
                      var height = cell.length * state.minuteHeight;
                      // eslint-disable-next-line
                      var className = prefixCls + '-time-detail ' + (last ? 'last ' : ' ') + (cell.empty ? prefixCls + '-time-detail-empty ' : prefixCls + '-time-detail-full ');
                      return React.createElement(
                        'div',
                        { key: 'weekIndex_' + cellIndex, style: { height: height }, className: className },
                        _this2.renderCell(cell)
                      );
                    })
                  )
                );
              })
            )
          )
        ) : null
      );
    }
  }]);

  return WeekSchedule;
}(Component);

WeekSchedule.propTypes = {
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
  showLine: PropTypes.bool
};
WeekSchedule.defaultProps = {
  prefixCls: 'rc-week-schedule',
  value: moment(),
  events: [],
  showLine: true,
  // direction: 'rotate',
  direction: 'normal',
  rowHeight: 60,
  colSpan: 30,
  header: function header(value) {
    return React.createElement(
      'h3',
      null,
      value.format('YYYY-MM-DD')
    );
  },
  dayLabelFormat: function dayLabelFormat(day) {
    return React.createElement(
      'div',
      null,
      day.format('ddd'),
      React.createElement('br', null),
      day.format('MM-DD')
    );
  }
};


export default WeekSchedule;