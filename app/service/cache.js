'use strict';

const Service = require('egg').Service;


class CacheService extends Service {

  // 设置值的方法
  async set(key, value, seconds) {
    if (!this.app.redis) return null;
    const data = JSON.stringify(value);
    const expired = seconds ? [ 'EX', seconds ] : [];
    await this.app.redis.set(key, data, ...expired);
  }

  // 获取值的方法
  async get(key) {
    if (!this.app.redis) return null;
    const data = await this.app.redis.get(key);
    return data && JSON.parse(data);
  }
}

module.exports = CacheService;
