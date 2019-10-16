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
    // cluster: {
    //   listen: {
    //     path: '',
    //     port: 7001,
    //     hostname: '0.0.0.0'
    //   }
    // },
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
            '/register/verifyPhoneCode',
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
    alipay: { // apply app private key / app public key / pay private key / pay public key
      app_id: '2018122062672017',
    appPrivKeyFile: "MIIEowIBAAKCAQEAytRAWUJE+t7Xg62PFPpwCxaIBwO942bZX2ehlHbdLSs0i1H3xHlIGTF/0pAYksLuXq8ovyGW263MqvAjt5n97JPjD1ip9eFuIZhZ2wbrOac+MerE+x7agDOBgmJGwdffxbGRRkjz/OtwrIfIVf7TcAm/MPSAuD3RAIkvVXzQO16x6BnBnev1JR+HybeyUssMCk1y6JZ2pZ4H62gGKGvDQcV8NW0q7g4qu2CwQKMVhbnMpG/wRuIla/MOB9MPZiV4CINsxNGya5mmzkXTemjheRl9me6dEZEgKU+tcgTH5Y36faRphbQQ9ATAt3EZQXw4gkoO9vHyEsf7mAAOofQyVQIDAQABAoIBAG+PpUEzKRvPnDyqJuwD/8KphvJMxZIhjOhj6MTvSCJDBGipEh24E8b/qe3YIhv/KftcXo4aXI7CHrPa19px0e/hO9/CBeHfN6M02B+Xw6P3cEcmeWgihU5EhjR/96lBIqzrSRuensz7dwL+wFtEiWmzgrzbjz1HiwC/dBCSUTqFlT7+M+xx8N6w3gQbZ8bpW33XY4KB26C5G8/g6ImEMUbNez8p+24qVztszHWfDHmGJp//Z4g6dgyd2RNrNZdzCyNmlsFRYRXgKa1WbC7qi2ihPUMmYLhlD5OFwZkGbk7bPy+GTYfAK6JjHRjONtdcE06pVFPUMlr7OL96MsABt1UCgYEA8YEPuvbE0Y4i+YlHrYxJ8iJ8WceWL1mNp6QFG6cNQ06+ohPhVVjEdKSFLQIz03aRGQI+E6Kuki5JVwlUeUmqJM1LJxA7NEm9b+YNQG+Y/23FcYAbuaiJp22qpo45XNLSs6QoKcqyJkZwM/Niv07mLP907PSt6WzM4a10vVs+pu8CgYEA1wDpWdxPpUsVfggCrfel6DveLzHvtX4DWPbL9NXj2j39B6Y0+1BuHMw5WZ/GoZxC0Gi/buuspwaqws9HiGg5ttMJqz23YOKUwHkpZrIpZjyVAjDoRduKcaX3q4/NCs5CPzWoGjfcJXoxcoZuYos5/kg+tXhmsH/DA0jmTfyR2vsCgYATZ71t1npGJFenGWLLDSS78g1v4Vut/lIlkEZgzHGCYQdsWpCWnQVcIgQZc73aVgKesdFvHnlMga+e8L765/Jl9qD9SI6ZSvuPzDpwXQc8LwPYdOTFbEdzTpqRu4fcb4xCpwQbJ5BdBvfpFLtwh9Ry9SveBmMbCIUF9TwWIwjLvQKBgFcQpG5iO9J4zFREFCm0rneTvs6nzyVUyTA+iKs17lYTYiK12KComl6JCPRVMk+BgsD4mgTl5P2iQoYvAA2p/y0c2r6AeIEAYDJtHinbHc6r27+OZJDdbXvGNLxBuEuW6NbF+LPdSQXYLKvu6kZ3kN17DgHYpuT0Z9ktrS2JiNr/AoGBAMBMG/25ioZMVuMFL2D1NqW221NLGMnHtFSATT1o6XGNEd5/PABCei7l2KSSrv93wyXllnk6cVauSn32zmKNWC0i6Ei89wYIUlgF7grRxBWHm0H8hgbss4YHqEf19t8Fu9QW0g48VXWsZaDmoNQotxytWx3rJ5jIuvz8xWz+UkbH",
    alipayPubKeyFile: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhb/KlxYfhRE8KRp92MQM8ZB8NVjoM9LYFOnPIuNtcMZVA8ld7ybDP2FiA+QEE7wLGqMImwl1Y4xzkrTLCjHVC8fdR8ZvzZR2I3ZOrARerI9+RbkCfT+7YLv55+A+WTHEyiB+v7PfXVTT28s0CHNLPXMyQD1u8UVEQEpbMSs8hH3pJF55Li7kc5VvJpV3RVO9TXZTVAA5mSp9FvO3u+47IJDgFVLnqqHh6ETL1nHVpxiAY2LGer+RWpVYD8v+We+VWsrfJP7bO0xr2pwizldepo8YNYPgcIAIwd7KiveypL1pA0xWgSjUHzrkVh1j/nSnvJgKSdydU/VRcaVt/Mt8wwIDAQAB"
    },
    alipayParams: {
      return_url: 'http://127.0.0.1:7001/alipay/return', // when pay success jump url
      notify_url: 'http://127.0.0.1:7001/alipay/notify', // when pay success, async notify url
    },
    weixinPay: {
      mch_id: '1502539541',
      wxappid: "wx7bf3787c783116e4",
      wxpaykey: 'zhongyuantengitying6666666666666'
    },
    weixinPayParams: {
      // notice: the notify url must config at weixin open platment
      notify_url:"http://test.86886.wang/weixinpay/notify"
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
