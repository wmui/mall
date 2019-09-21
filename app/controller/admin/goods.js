'use strict';
const BaseController = require('./base');

// 颜色最好配置到数据库
const goods_colors = [
  {
    _id: 1,
    color_name: '红色',
    color_value: '#d0021b',
  },
  {
    _id: 2,
    color_name: '黄色',
    color_value: '#f8e71c',
  },
  {
    _id: 3,
    color_name: '绿色',
    color_value: '#417505',
  },
];
class GoodsController extends BaseController {
  async index() {
    const list = await this.ctx.model.Goods.find();
    await this.ctx.render('admin/goods/index', { list });
  }

  async add() {
    const goods_types = await this.ctx.model.GoodsType.find({});
    const goods_cates = await this.ctx.model.GoodsCate.aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'items',
        },
      },
      {
        $match: {
          pid: '0',
        },
      },
    ]);
    await this.ctx.render('admin/goods/add', {
      goods_colors,
      goods_types,
      goods_cates,
    });
  }

  async doAdd() {

  }

  async goodsTypeAttr() {
    const { cate_id } = this.ctx.query;
    const goods_type_attrs = await this.ctx.model.GoodsTypeAttr.find({ cate_id });
    this.ctx.body = goods_type_attrs;
  }
}

module.exports = GoodsController;
