/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567350499853_8158';

  // add your middleware config here
  config.middleware = [ 'adminAuth', 'init' ];

  // add your user config here
  const userConfig = {
    view: {
      mapping: {
        '.html': 'nunjucks',
        defaultExtension: '.html',
      },
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/mall',
        options: {},
        plugins: [],
      },
    },
    session: {
      key: 'SESSION_ID',
      maxAge: 864000 * 1000,
      httpOnly: true,
      encrypt: true,
      renew: true,
    },
    adminAuth: {
      match: '/admin',
    },
    globalData: {},
    multipart: {
      fileSize: '50mb',
      fileExtensions: [ '.apk', '.tar' ],
      fields: 30,
    },
    uploadDir: 'app/public/upload',
    security: {
      csrf: {
        ignore: ctx => {
          return [
            '/admin/goods/upload',
            '/admin/status',
            '/sendMsg',
          ].includes(ctx.request.url);
        },
      },
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0, // TODO: why is zero
      },
    },
    sms: { // https://cloud.tencent.com/document/product/382/3772
      appId: '1400263664',
      appKey: '754e26c86aae4a100085c935168757e',
      templateId: '433528',
      smsSign: '居享',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
