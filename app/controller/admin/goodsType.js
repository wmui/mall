'use strict';
const BaseController = require('./base');

class GoodsTypeController extends BaseController {
  async index() {
    const list = await this.ctx.model.GoodsType.find();
    await this.ctx.render('admin/goodsType/index', { list });
  }

  async add() {
    await this.ctx.render('admin/goodsType/add');
  }

  async doAdd() {
    const { body } = this.ctx.request;
    await new this.ctx.model.GoodsType(body).save();
    await this.success('/admin/goodsType', '增加商品类型成功');
  }

  async edit() {
    const { id } = this.ctx.request.query;
    const goods_type = await this.ctx.model.GoodsType.findOne({ _id: id });
    await this.ctx.render('admin/goodsType/edit', { goods_type });
  }

  async doEdit() {
    const { body } = this.ctx.request;
    await this.ctx.model.GoodsType.updateOne({ _id: body.id }, body);
    await this.success('/admin/goodsType', '编辑商品类型成功');
  }
}

module.exports = GoodsTypeController;
