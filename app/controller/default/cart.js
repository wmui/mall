'use strict';

const Controller = require('egg').Controller;

class CartController extends Controller {
  async doCart() {
    // 根据id获取商品数据  如果有cookie有这个商品，就数量加1 如果没有就添加新的
    const { id } = this.ctx.query;
    const list = this.ctx.service.cookie.get('cart_list');
    const goods = await this.ctx.model.Goods.findOne({ _id: id }).select('title shop_price goods_img');

    const params = {
      title: goods.title,
      shop_price: goods.shop_price,
      goods_img: goods.goods_img,
      num: 1,
      checked: true,
    };
    if (!list) {
      goods && this.ctx.service.cookie.set('cart_list', [ params ]);
    } else {
      goods && list.push(params);
      this.ctx.service.cookie.set('cart_list', list);
    }

    await this.ctx.redirect('/cartSuccess');
  }

  async cartSuccess() {
    await this.ctx.render('default/cartSuccess');
  }

  async index() {
    const list = this.ctx.service.cookie.get('cart_list');

    await this.ctx.render('default/cart', { list });
  }
}

module.exports = CartController;
