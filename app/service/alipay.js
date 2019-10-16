'use strict';

const Service = require('egg').Service;
const Alipay = require('alipay-mobile');

class AlipayService extends Service {
  async doPay(order) {
    return new Promise(resolve => {
      const opt = this.config.alipay;
      const params = this.config.alipayParams;
      const service = new Alipay(opt);
      service.createPageOrderURL(order, params).then(result => {
        resolve(result.data); // pay url
      });
    });
  }

  async alipayNotify(params) {
    // console.log(params);
    // check order params is right
    const service = new Alipay(this.config.alipay);
    return service.makeNotifyResponse(params);
  }
}

module.exports = AlipayService;
