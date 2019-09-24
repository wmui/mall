'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    await this.ctx.render('admin/main/index');
  }

  async status() {
    const { model, id, val, field } = this.ctx.request.body;
    await this.ctx.model[model].updateOne({ _id: id }, { [field]: +val });
    this.ctx.body = { success: true };
  }
}

module.exports = MainController;
