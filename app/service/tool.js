'use strict';
const svgCaptcha = require('svg-captcha');
const Service = require('egg').Service;
const dayjs = require('dayjs');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const fs = require('fs');
const pump = require('mz-modules/pump');

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

  async getUploadFile() {
    const parts = this.ctx.multipart({ autoFields: true });
    let stream = null;
    let body = {};
    while ((stream = await parts()) !== null) {
      if (!(stream && stream.filename)) break;
      const { filename, fieldname } = stream;

      const { uploadDir, saveDir } = await this.createFolder(filename);

      const writeStream = await fs.createWriteStream(uploadDir);
      await pump(stream, writeStream);
      body = Object.assign(parts.field, { [fieldname]: saveDir });
    }
    body = Object.assign(body, parts.field);
    return body;
  }

  objectId(id) {
    return this.app.mongoose.Types.ObjectId(id);
  }
}

module.exports = ToolService;
