import expect from 'expect.js';
import React from 'react';
import { findDOMNode, render, unmountComponentAtNode } from 'react-dom';
// import { Simulate } from 'react-dom/test-utils';
import $ from 'jquery';
import moment from 'moment';
import async from 'async';

import SimpleSheet from '../index';

import '../assets/index.less';

const timeout = (ms) => {
  return (done) => {
    setTimeout(done, ms);
  };
};

const expectQueryLength = (component, query, length) => {
  const componentDomNode = findDOMNode(component);
  const findLength = $(componentDomNode).find(query).length;
  // console.log('query', query);
  expect(findLength).to.be(length);
};

const verifyExist = (component, query, content, done) => {
  async.series([timeout(20), (next) => {
    expectQueryLength(component, query, content);
    next();
  }, timeout(20), (next) => {
    next();
  }], done);
};

const expectPopupToHaveContent = (component, query, content) => {
  const componentDomNode = findDOMNode(component);
  const htmlContent = $(componentDomNode).find(query).text().trim();
  // eslint-disable-next-line
  // console.log('htmlContent', htmlContent, 'content', content, 'query', query);
  expect(htmlContent).to.be(content);
};

const verifyContent = (component, query, content, done) => {
  async.series([timeout(20), (next) => {
    expectPopupToHaveContent(component, query, content);
    next();
  }, timeout(20), (next) => {
    next();
  }], done);
};

describe('rc-week-schedule', () => {
  let div;
  before(() => {
    timeout(40000);
    div = document.createElement('div');
    div.style.margin = '100px';
    document.body.insertBefore(div, document.body.firstChild);
  });

  afterEach(() => {
    unmountComponentAtNode(div);
  });

  describe('check default props', () => {
    it('topLeftCell', (done) => {
      const simpleSheet = render(<SimpleSheet key="default_props_test_1" className="custom-rc-week-schedule" />, div);
      // const prefixCls = simpleSheet.props.prefixCls;
      verifyContent(simpleSheet, 'tr:nth-child(2) td:first-child', '时间', done);
    });
    it('time cell 1', (done) => {
      const simpleSheet = render(<SimpleSheet key="default_props_test_2" className="custom-rc-week-schedule" />, div);
      const prefixCls = simpleSheet.props.prefixCls;
      verifyContent(simpleSheet, `tr:nth-child(3) td:nth-child(1) .${prefixCls}-time-detail:first-child`, '6点', done);
    });
    it('time cell 2', (done) => {
      const simpleSheet = render(<SimpleSheet key="default_props_test_3" className="custom-rc-week-schedule" />, div);
      const prefixCls = simpleSheet.props.prefixCls;
      verifyContent(simpleSheet, `tr:nth-child(3) td:nth-child(1) .${prefixCls}-time-detail:nth-child(2)`, '7点', done);
    });
    it('row cell length default 3', (done) => {
      // this must not exist
      const simpleSheet = render(<SimpleSheet key="default_props_test_4" className="custom-rc-week-schedule" />, div);
      // const prefixCls = simpleSheet.props.prefixCls;
      verifyExist(simpleSheet, 'tr:nth-child(2) td', 8, done);
    });
  });

  describe('check value and events props', () => {
    const props = {
      rowHeight: 40,
      showLine: true,
      direction: 'normal',
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
    it('topLeftCell', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_1" className="custom-rc-week-schedule" />, div);
      // const prefixCls = simpleSheet.props.prefixCls;
      verifyContent(simpleSheet, 'tr:nth-child(2) td:first-child', '时间', done);
    });
    it('topLeft2Cell', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_1" className="custom-rc-week-schedule" />, div);
      // const prefixCls = simpleSheet.props.prefixCls;
      verifyContent(simpleSheet, 'tr:nth-child(2) td:nth-child(2)', 'Mon07-10', done);
    });
    it('topLeft8Cell', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_1" className="custom-rc-week-schedule" />, div);
      // const prefixCls = simpleSheet.props.prefixCls;
      verifyContent(simpleSheet, 'tr:nth-child(2) td:nth-child(8)', 'Sun07-16', done);
    });
    it('time detail length', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_2" className="custom-rc-week-schedule" />, div);
      const prefixCls = simpleSheet.props.prefixCls;
      verifyExist(simpleSheet, `tr:nth-child(3) td:nth-child(6) .${prefixCls}-cell-column:not(.${prefixCls}-bg-cell-column) .${prefixCls}-time-detail`, 4, done);
    });

    it('time detail cell 1', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_2" className="custom-rc-week-schedule" />, div);
      const prefixCls = simpleSheet.props.prefixCls;
      verifyContent(simpleSheet, `tr:nth-child(3) td:nth-child(6) .${prefixCls}-cell-column:not(.${prefixCls}-bg-cell-column) .${prefixCls}-time-detail:nth-child(4)`, '跨时间的老王', done);
    });

    it('time detail cell 2', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_2" className="custom-rc-week-schedule" />, div);
      const prefixCls = simpleSheet.props.prefixCls;
      verifyContent(simpleSheet, `tr:nth-child(3) td:nth-child(7) .${prefixCls}-cell-column:not(.${prefixCls}-bg-cell-column) .${prefixCls}-time-detail:nth-child(1)`, '跨时间的老王', done);
    });

    it('time detail cell 3', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_2" className="custom-rc-week-schedule" />, div);
      const prefixCls = simpleSheet.props.prefixCls;
      const query = `tr:nth-child(3) td:nth-child(7) .${prefixCls}-cell-column:not(.${prefixCls}-bg-cell-column) .${prefixCls}-time-detail:nth-child(2)`;
      async.series([timeout(20), (next) => {
        const componentDomNode = findDOMNode(simpleSheet);
        const $queryElem = $($(componentDomNode).find(query)[0]);
        expect($queryElem.hasClass('last')).to.be(true);
        expect($queryElem.hasClass(`${prefixCls}-time-detail`)).to.be(true);
        expect($queryElem.hasClass(`${prefixCls}-time-detail-empty`)).to.be(true);
        next();
      }, timeout(20), (next) => {
        next();
      }], done);
    });

    it('time detail cell 4, height', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_2" className="custom-rc-week-schedule" />, div);
      const prefixCls = simpleSheet.props.prefixCls;
      const query = `tr:nth-child(3) td:nth-child(7) .${prefixCls}-cell-column:not(.${prefixCls}-bg-cell-column) .${prefixCls}-time-detail:nth-child(1)`;
      async.series([timeout(20), (next) => {
        const componentDomNode = findDOMNode(simpleSheet);
        const $queryElem = $($(componentDomNode).find(query)[0]);
        expect(parseInt($queryElem.css('height'), 10)).to.be(137);
        next();
      }, timeout(20), (next) => {
        next();
      }], done);
    });
    it('time detail cell 5, height', (done) => {
      const simpleSheet = render(<SimpleSheet {...props} key="default_props_test_2" className="custom-rc-week-schedule" />, div);
      const prefixCls = simpleSheet.props.prefixCls;
      const query = `tr:nth-child(3) td:nth-child(7) .${prefixCls}-cell-column:not(.${prefixCls}-bg-cell-column) .${prefixCls}-time-detail:nth-child(2)`;
      async.series([timeout(20), (next) => {
        const componentDomNode = findDOMNode(simpleSheet);
        const $queryElem = $($(componentDomNode).find(query)[0]);
        expect(parseInt($queryElem.css('height'), 10)).to.be(542);
        next();
      }, timeout(20), (next) => {
        next();
      }], done);
    });
  });
});
