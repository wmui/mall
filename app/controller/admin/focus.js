'use strict';
const BaseController = require('./base');

class FocusController extends BaseController {
  async index() {
    const list = await this.ctx.model.Focus.find();
    await this.ctx.render('admin/focus/index', { list });
  }

  async add() {
    await this.ctx.render('admin/focus/add');
  }

  async doAdd() {
    const body = await this.service.tool.getUploadFile();
    await new this.ctx.model.Focus(body).save();
    await this.success('/admin/focus', '增加轮播图成功');
  }

  async edit() {
    const { id } = this.ctx.request.query;
    const one = await this.ctx.model.Focus.findOne({ _id: id });
    await this.ctx.render('admin/focus/edit', {
      one,
    });
  }

  async doEdit() {
    const body = await this.service.tool.getUploadFile();
    await this.ctx.model.Focus.updateOne({ _id: body.id }, body);
    await this.success('/admin/focus', '修改轮播图成功');
  }
}

module.exports = FocusController;
