'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
  async list() {
    const data = await this.ctx.model.Goods.find();
    this.ctx.body = {
      success: true,
      data,
    };
  }

  async one() {
    const { id } = this.ctx.params;
    const one = await this.ctx.model.Goods.findOne({ _id: id });
    this.ctx.body = {
      success: true,
      data: one,
    };
  }

  async search() {
    const { keywords } = this.ctx.params;

    // add data
    // await this.app.elasticsearch.bulk({
    //   body: [
    //     { index: { _index: 'mall', _type: 'goods', _id: Date.now() } },
    //     { content: '华为手机是中国骄傲0' },
    //   ],
    // });

    // await this.app.elasticsearch.bulk({
    //   body: [
    //     { update: { _index: 'mall', _type: 'goods', _id: '100' } },
    //     { doc: { content: '华为手机' } },
    //   ],
    // });

    // await this.app.elasticsearch.bulk({
    //   body: [
    //     { delete: { _index: 'mall', _type: 'goods', _id: '100' } },
    //   ],
    // });

    // total count
    // await this.app.elasticsearch.count({})

    // search
    const page = 2;
    const pageSize = 1;
    const data = await this.app.elasticsearch.search({
      index: 'mall',
      type: 'goods',
      from: (page - 1) * pageSize,
      size: pageSize,
      body: {
        query: {
          match: {
            content: '华为手机',
          },
        },
      },
    });

    this.ctx.body = {
      success: true,
      data,
    };
  }
}

module.exports = GoodsController;
