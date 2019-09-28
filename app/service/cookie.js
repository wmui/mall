'use strict';

const Service = require('egg').Service;

class CookieService extends Service {
  set(key, val, expires) {
    this.ctx.cookies.set(key, JSON.stringify(val), {
      maxAge: expires || 24 * 3600 * 1000,
      httpOnly: true,
      encrypt: true,
    });
  }

  get(key) {
    const val = this.ctx.cookies.get(key, { encrypt: true });
    return val && JSON.parse(val);
  }
}

module.exports = CookieService;
