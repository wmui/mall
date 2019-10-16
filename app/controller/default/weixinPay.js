'use strict';

const Controller = require('egg').Controller;
const { parseString } = require('xml2js');

class WeixinPayController extends Controller {
  async pay() {
    const order = {
      title: 'goods title',
      out_trade_no: Date.now(),
      price: '0.1',
    };

    const url = await this.service.weixinPay.doPay(order);
    const qrImage = await this.service.tool.qrImage(url);
    this.ctx.type = 'iamge/png';
    this.ctx.body = qrImage;
  }

  async weixinPayNotify() {
    let params = ''; // weixin post data is xml
    this.ctx.req.on('data', chunk => { params += chunk; });
    this.ctx.req.on('end', () => {
      parseString(params, { explicitArray: false }, async (error, json) => {
        if (error) console.log(error);
        // compare sign
        const sign = await this.service.weixinPay.weixinPayNotify(json.xml);
        if (sign === json.xml.sign) {
          // ok, update order info
        }
      });
    });
  }
}

module.exports = WeixinPayController;
