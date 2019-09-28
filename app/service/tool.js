'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;
const dayjs = require('dayjs');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const fs = require('fs');
const pump = require('mz-modules/pump');
const Jimp = require('jimp');
const QcloudSms = require('qcloudsms_js');
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

  async createFolder(filename) {
    // 根据日期创建文件夹，并把文件按照时间戳方式命名
    const day = dayjs().format('YYYYMMDD');
    const dir = path.join(this.config.uploadDir, day);
    await mkdirp(dir);
    const uploadDir = path.join(dir, Date.now() + path.extname(filename));
    return {
      uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
    };
  }

  async jimp(target) {
    await Jimp.read(target, (err, lenna) => {
      if (err) throw err;
      lenna
        .resize(200, Jimp.AUTO)
        .quality(80)
        .write(target + '_200' + path.extname(target));
      lenna.resize(400, Jimp.AUTO)
        .quality(80)
        .write(target + '_400' + path.extname(target));
    });
  }

  async getUploadFile(enableThumbnail) {
    const parts = this.ctx.multipart({ autoFields: true });
    let stream = null;
    let body = {};
    while ((stream = await parts()) !== null) {
      if (!(stream && stream.filename)) break;
      const { filename, fieldname } = stream;

      const { uploadDir, saveDir } = await this.createFolder(filename);

      const writeStream = await fs.createWriteStream(uploadDir);
      await pump(stream, writeStream);
      if (enableThumbnail) this.jimp(uploadDir); // 生成缩略图
      body = Object.assign(parts.field, { [fieldname]: saveDir });
    }
    body = Object.assign(body, parts.field);
    return body;
  }

  objectId(id) {
    return this.app.mongoose.Types.ObjectId(id);
  }

  sendMsg(phone, code) {
    const { appId, appKey, templateId, smsSign } = this.config.sms;
    const qcloudsms = QcloudSms(appId, appKey);
    const ssender = qcloudsms.SmsSingleSender();
    const params = [ code, '3' ];
    function callback(err, res, resData) {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('request data: ', res.req);
        console.log('response data: ', resData);
      }
    }

    ssender.sendWithParam('86', phone, templateId,
      params, smsSign, '', '', callback); // 倒数第二个是ext参数（可以通过resData.ext获取），倒数第三个应该是废弃的extend参数
  }
}

module.exports = ToolService;
