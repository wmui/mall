'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    await this.ctx.render('admin/main/index');
  }
}

module.exports = MainController;
