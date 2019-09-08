'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;

class ToolService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i', // 排除不易识别的字符
      fontSize: 50,
      width: 100,
      height: 32,
      background: '#cc9966',
    });

    this.ctx.session.code = captcha.text;

    return captcha;
  }
}

module.exports = ToolService;
