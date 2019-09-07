'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async test() {
    await this.ctx.render('test');
  }
}

module.exports = HomeController;
