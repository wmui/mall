'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.default.home.index);

};
