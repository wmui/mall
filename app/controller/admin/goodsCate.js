'use strict';
const BaseController = require('./base');

class GoodsCateController extends BaseController {
  async index() {
    const list = await this.ctx.model.GoodsCate.aggregate([
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
    await this.ctx.render('admin/goodsCate/index', { list });
  }

  async add() {
    const goods_cates = await this.ctx.model.GoodsCate.find({ pid: '0' });
    goods_cates.unshift({ _id: '0', title: '--顶级分类--' });
    await this.ctx.render('admin/goodsCate/add', { goods_cates });
  }

  async doAdd() {
    const { GoodsCate } = this.ctx.model;
    const body = await this.service.tool.getUploadFile(true);

    if (body.pid !== '0') body.pid = this.service.tool.objectId(body.pid);
    await new GoodsCate(body).save();
    await this.success('/admin/goodsCate', '增加分类成功');
  }

  async edit() {
    const { id } = this.ctx.request.query;
    const { GoodsCate } = this.ctx.model;
    const one = await GoodsCate.findOne({ _id: id });
    const list = await GoodsCate.find({ pid: '0' });
    list.unshift({ _id: '0', title: '--顶级分类--' });
    await this.ctx.render('admin/goodsCate/edit', {
      list,
      one,
    });
  }

  async doEdit() {
    const { GoodsCate } = this.ctx.model;
    const body = await this.service.tool.getUploadFile(true);
    console.log(body);

    if (body.pid !== '0') body.pid = this.service.tool.objectId(body.pid);
    await GoodsCate.updateOne({ _id: body.id }, body);
    await this.success('/admin/goodsCate', '编辑分类成功');
  }
}

module.exports = GoodsCateController;
