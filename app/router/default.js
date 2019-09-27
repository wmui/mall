'use strict';
module.exports = app => {
  const { router, controller } = app;
  // const initMiddleware = app.middleware.init({}, app);
  router.get('/', controller.default.home.index);
  router.get('/list', controller.default.home.list);
  router.get('/product', controller.default.home.product);
};
