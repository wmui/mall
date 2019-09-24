'use strict';
const dayjs = require('dayjs');
module.exports = {
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
