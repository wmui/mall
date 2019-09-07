'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.list);
  router.get('/test/:id', controller.home.one);
  router.post('/test', controller.home.create);
  router.delete('/test/:id', controller.home.remove);
  router.patch('/test/:id', controller.home.update);

};
