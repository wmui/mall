'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.time('redis');
    // const getCache = this.app.redis.get(key);
    const goods_list = await this.ctx.model.Goods.find();
    const focus = await this.ctx.model.Focus.find();
    await this.ctx.render('default/home', { focus, goods_list });
    console.timeEnd('redis');
  }

  async list() {
    const { goods_type_id } = this.ctx.query;
    const goods_list = await this.ctx.model.Goods.find({
      goods_type_id,
    });

    await this.ctx.render('default/list', { goods_list });
  }

}

module.exports = HomeController;
