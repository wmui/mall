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
  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  },
};
