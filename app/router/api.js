'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/goods', controller.api.goods.list);
  router.get('/api/goods/:id', controller.api.goods.one);
  router.get('/api/search/:keywords', controller.api.goods.search);
};
