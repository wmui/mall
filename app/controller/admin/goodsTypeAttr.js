'use strict';
const BaseController = require('./base');

class GoodsTypeAttrController extends BaseController {
  async index() {
    const { cate_id } = this.ctx.query;
    const goods_type = await this.ctx.model.GoodsType.findOne({ _id: cate_id });
    const list = await this.ctx.model.GoodsTypeAttr.aggregate([
      {
        $lookup: {
          from: 'goods_type',
          localField: 'cate_id',
          foreignField: '_id',
          as: 'goods_type',
        },
      },
      {
        $match: {
          cate_id: this.ctx.service.tool.objectId(cate_id),
        },
      },
    ]);

    await this.ctx.render('admin/goodsTypeAttr/index', {
      list,
      cate_id,
      goods_type,
    });
  }

  async add() {
    const { cate_id } = this.ctx.request.query;
    const goods_types = await this.ctx.model.GoodsType.find();
    await this.ctx.render('admin/goodsTypeAttr/add', {
      cate_id,
      goods_types,
    });
  }

  async doAdd() {
    const { body } = this.ctx.request;
    const { GoodsTypeAttr } = this.ctx.model;
    await new GoodsTypeAttr(body).save();
    await this.success('/admin/goodsTypeAttr?cate_id=' + body.cate_id, '增加商品类型属性成功');
  }

  async edit() {
    const { GoodsTypeAttr, GoodsType } = this.ctx.model;
    const { id } = this.ctx.query;
    const goods_type_attr = await GoodsTypeAttr.findOne({ _id: id });
    const goods_types = await GoodsType.find({});

    await this.ctx.render('admin/goodsTypeAttr/edit', {
      goods_type_attr,
      goods_types,
    });
  }

  async doEdit() {
    const { body } = this.ctx.request;
    await this.ctx.model.GoodsTypeAttr.updateOne({ _id: body.id }, body);
    await this.success('/admin/goodsTypeAttr?cate_id=' + body.cate_id, '修改商品类型属性成功');
  }
}

module.exports = GoodsTypeAttrController;
