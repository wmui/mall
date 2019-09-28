'use strict';
module.exports = app => {
  const { router, controller } = app;
  // const initMiddleware = app.middleware.init({}, app);
  router.get('/', controller.default.home.index);
  router.get('/list', controller.default.home.list);
  router.get('/product', controller.default.home.product);
  router.get('/cart', controller.default.home.cart);
  router.get('/doCart', controller.default.home.doCart);
  router.get('/cartSuccess', controller.default.home.cartSuccess);

  router.get('/register', controller.default.home.register);
  router.post('/sendMsg', controller.default.home.sendMsg);
};
