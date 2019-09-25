'use strict';

const Service = require('egg').Service;

class GoodsService extends Service {
  async goodsCateList() {
    const list = await this.ctx.model.GoodsCate.aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'items',
        },
      },
      {
        $match: {
          pid: '0',
        },
      },
    ]);
    return list;
  }
}

module.exports = GoodsService;
