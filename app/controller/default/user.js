'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');


class UserController extends Controller {
  async step1() {
    await this.ctx.render('default/register/step1');
  }

  async step2() {
    const { sign, user_code } = this.ctx.query;
    const add_day = await this.ctx.service.tool.getDay();
    const tmp = await this.ctx.model.UserTmp.findOne({ sign, add_day });
    if (!tmp) return await this.ctx.redirect('/register/step1'); // 非法闯入

    await this.ctx.render('default/register/step2', {
      user_code,
      sign,
      phone: tmp.phone,
    });
  }

  async step3() {
    const { sign, phone_code } = this.ctx.query;
    const add_day = await this.ctx.service.tool.getDay();
    const tmp = await this.ctx.model.UserTmp.findOne({ sign, add_day });
    if (!tmp) return await this.ctx.redirect('/register/step1'); // 非法闯入

    await this.ctx.render('default/register/step3', {
      sign,
      phone_code,
    });
  }

  async sendMsg() {
    const { phone, user_code } = this.ctx.request.body;

    if (!/\d{11}/.test(phone)) {
      this.ctx.body = {
        success: false,
        error: { message: '手机号错误' },
      };
      return;
    }

    if (user_code !== this.ctx.session.user_code) {
      this.ctx.body = {
        success: false,
        error: { message: '图片验证码错误' },
      };
      return;
    }

    const day = await this.ctx.service.tool.getDay();
    const ip = this.ctx.request.ip.replace(/::ffff:/, '');
    const sign = md5(day + phone);
    const ipCount = await this.ctx.model.UserTmp.find({ ip }).count();
    const code = Array(4).fill('').map(() => Math.floor(Math.random() * 10))
      .join('');
    let userTmp = await this.ctx.model.UserTmp.findOne({ sign });

    if (!userTmp) {
      userTmp = await this.ctx.model.UserTmp({
        phone,
        add_day: day,
        sign,
        ip,
      }).save();
    }

    // 同IP一天最多发送10次，同一个手机号一天最多发送三次
    if (ipCount > 10 || userTmp.send_count > 3) {
      this.ctx.body = {
        success: false,
        error: { message: '当前手机号码发送次数达到上限，明天重试' },
      };
      return;
    }

    await this.service.tool.sendMsg(phone, code);
    await this.ctx.model.UserTmp.updateOne({ sign }, { send_count: userTmp.send_count + 1 });

    this.ctx.session.phone_code = code;
    this.ctx.body = { success: true, data: { sign } };
  }

  async verifyPhoneCode() {
    const { phone_code } = this.ctx.request.body;
    this.ctx.body = {
      success: this.ctx.session.phone_code === phone_code,
    };
  }

  async verify() {
    const captcha = await this.service.tool.captcha();
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.session.user_code = captcha.text; // 文本
    this.ctx.body = captcha.data; // 图片
  }

  async doRegister() {
    const { sign } = this.ctx.request.body;
    const add_day = await this.ctx.service.tool.getDay();
    const tmp = await this.ctx.model.UserTmp.findOne({ sign, add_day });

    if (!tmp) return await this.ctx.redirect('/register/step1'); // 非法闯入

    try {
      const { ctx } = this;

      this.ctx.validate({
        password: { type: 'string', min: 6, max: 15 },
        rpassword: { type: 'string', min: 6, max: 15, compare: 'password' },
        phone_code: [ ctx.session.phone_code ],
      }, ctx.request.body);

      let user = await new this.ctx.model.User({
        phone: tmp.phone,
        password: ctx.request.body.password,
        last_ip: tmp.ip,
      }).save();

      if (user) {
        user = await this.ctx.model.User.findOne({ phone: tmp.phone }, '-password');
      }
      this.ctx.service.cookie.set('userinfo', user);
      this.ctx.redirect('/');
    } catch (error) {
      this.ctx.redirect('/register/step3', { message: error.message || 'error' });
    }
  }
}

module.exports = UserController;
