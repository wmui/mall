'use strict';

const Controller = require('egg').Controller;

class AlipayController extends Controller {
  async pay() {
    const order = {
      subject: '商品名',
      out_trade_no: '11111773678266999',
      total_amount: '0.1', // must string, the unit is yuan
    };

    const url = await this.service.alipay.doPay(order);

    await this.ctx.redirect(url); // jump pay url
  }

  async alipayReturn() {
    this.ctx.body = 'pay success';
  }

  async alipayNotify() {
    const { params } = this.ctx.request;
    const result = await this.service.alipay.alipayNotify(params);
    if (result.code === 0 && params.trade_status === 'TRADE_SUCCESS') {
      // update order state
      console.log('update order state');

    }
  }
}

module.exports = AlipayController;
