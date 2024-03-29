'use strict';

const BaseController = require('./base.js');

class LoginController extends BaseController {
  async index() {
    await this.ctx.render('admin/login');
  }

  async doLogin() {

    const { username, password, code } = this.ctx.request.body;

    if (code.toUpperCase() !== this.ctx.session.code.toUpperCase()) {
      return await this.error('/admin/login', '验证码错误');
    }

    const user = await this.ctx.model.Manager.findOne({ username, password });
    if (!user) return await this.error('/admin/login', '用户名或密码错误');
    this.ctx.session.userinfo = user;
    this.ctx.redirect('/admin');
  }

  async logout() {
    this.ctx.session.userinfo = null;
    this.error('/admin/login');
  }
}

module.exports = LoginController;
