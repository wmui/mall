'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index() {
    const { id } = this.ctx.query;
    const imgs = await this.ctx.model.GoodsImage.find({ goods_id: id });
    const goods = await this.ctx.model.Goods.findOne({ _id: id });
    const attrs = await this.ctx.model.GoodsTypeAttr.find({ cate_id: goods.cate_id });
    await this.ctx.render('default/product', { goods, imgs, attrs });
  }
}

module.exports = ProductController;
