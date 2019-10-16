'use strict';
module.exports = app => {
  const { router, controller } = app;
  // const initMiddleware = app.middleware.init({}, app);
  // const userAuth = app.middleware.userAuth();
  const xmlParser = app.middleware.xmlParser();
  router.get('/', controller.default.home.index);
  router.get('/list', controller.default.home.list);

  router.get('/product', controller.default.product.index);

  router.get('/cart', controller.default.cart.index);
  router.get('/doCart', controller.default.cart.doCart);
  router.get('/cartSuccess', controller.default.cart.cartSuccess);

  router.get('/register/step1', controller.default.user.step1);
  router.get('/register/step2', controller.default.user.step2);
  router.get('/register/step3', controller.default.user.step3);
  router.get('/verify', controller.default.user.verify);
  router.post('/sendMsg', controller.default.user.sendMsg);
  router.post('/register', controller.default.user.doRegister);
  router.get('/login', controller.default.user.login);
  router.post('/doLogin', controller.default.user.doLogin);
  router.get('/logout', controller.default.user.doLogout);

  router.post('/register/verifyPhoneCode', controller.default.user.verifyPhoneCode);

  router.get('/alipay/pay', xmlParser, controller.default.alipay.pay);
  router.get('/alipay/return', controller.default.alipay.alipayReturn);
  router.post('/alipay/notify', controller.default.alipay.alipayNotify);

  router.get('/weixinpay/pay', controller.default.weixinPay.pay);

  router.post('/weixinpay/notify', xmlParser, controller.default.weixinPay.weixinPayNotify);
};
