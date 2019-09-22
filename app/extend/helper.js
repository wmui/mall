'use strict';
const dayjs = require('dayjs');
module.exports = {
  getNodeName(type) {
    const maps = {
      1: '模块',
      2: '菜单',
      3: '操作',
    };
    return maps[type];
  },
  getStatus(type) {
    const maps = {
      1: '开启',
      2: '关闭',
    };
    return maps[type];
  },
  getMethod(type) {
    const maps = {
      1: '单行文本框',
      2: '多行文本框',
      3: '下拉选择框',
    };
    return maps[type];
  },
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
  selected(val1, val2) {
    return val1.toString() === val2.toString() ? 'selected' : '';
  },
  checkedColor(val, arr) {
    const a = arr.map(i => i.toString());
    return a.includes(val.toString()) ? 'checked' : '';
  },
};
