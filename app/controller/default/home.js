'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const goods_list = await this.ctx.model.Goods.find();
    const focus = await this.ctx.model.Focus.find();
    await this.ctx.render('default/home', { focus, goods_list });
  }
}

module.exports = HomeController;
