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
  config.middleware = [];

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
      },
    },
    session: {
      key: 'SESSION_ID',
      maxAge: 864000,
      httpOnly: true,
      encrypt: true,
      renew: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
