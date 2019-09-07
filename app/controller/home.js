'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async list() {
    const { Test } = this.ctx.model;
    const data = await Test.find().exec();
    await this.ctx.render('test/test', { data });
  }

  async one() {
    const { id } = this.ctx.params;
    const { Test } = this.ctx.model;
    const data = await Test.findOne({ _id: id }).exec();
    await this.ctx.render('test/test', { data });
  }

  async create() {
    const { body } = this.ctx.request;
    const { Test } = this.ctx.model;

    await new Test(body).save();
  }

  async update() {
    const { id } = this.ctx.params;
    const { Test } = this.ctx.model;
    await Test.updateOne({ _id: id }).exec();
  }

  async remove() {
    const { id } = this.ctx.params;
    const { Test } = this.ctx.model;
    await Test.deleteOne({ _id: id }).exec();
  }
}

module.exports = HomeController;
