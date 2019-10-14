
'use strict';

const Service = require('egg').Service;
const WechatPay = require('../lib/wechatPay');


class WeixinPayService extends Service {
  async doPay(order) {
    return new Promise((resolve, reject) => {
      const pay = new WechatPay(this.config.weixinPay);
      pay.createOrder({
        openid: '',
        notify_url: this.config.weixinPayParams.notify_url, //微信支付完成后的回调
        out_trade_no: order.out_trade_no, //订单号
        attach: order.title,
        body: order.title,
        total_fee: (order.price).toString(), // 此处的额度为分
        spbill_create_ip: this.ctx.request.ip.replace(/::ffff:/, ''),
      }, (error, result) => {
        if (error) reject(error);
        resolve(result.code.url);
      })
    })
  }

  async weixinPayNotify(params) {
    const pay = new WechatPay(this.config.weixinPay);
    const { sign, ...rest } = params;
    return pay.getSign(rest);
  }
}

module.exports = WeixinPayService;
