'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl = '/', message = '操作成功') {
    await this.ctx.render('admin/public/success', {
      redirectUrl,
      message,
    });
  }

  async error(redirectUrl = '/', message = '操作失败') {
    await this.ctx.render('admin/public/error', {
      redirectUrl,
      message,
    });
  }

  async verify() {
    const captcha = await this.service.tool.captcha();
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }

  async delete() {
    const { model, id } = this.ctx.query; // Role
    await this.ctx.model[model].deleteOne({ _id: id });
    this.ctx.redirect(this.ctx.locals.prevPage);

  }
}

module.exports = BaseController;
