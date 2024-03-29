'use strict';
module.exports = app => {
  const { router, controller } = app;

  router.get('/admin', controller.admin.main.index);
  router.put('/admin/status', controller.admin.main.status);

  router.get('/admin/login', controller.admin.login.index);
  router.get('/admin/logout', controller.admin.login.logout);
  router.post('/admin/doLogin', controller.admin.login.doLogin);

  router.get('/admin/verify', controller.admin.base.verify);
  router.get('/admin/delete', controller.admin.base.delete);

  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);
  router.get('/admin/manager/edit', controller.admin.manager.edit);
  router.post('/admin/manager/doEdit', controller.admin.manager.doEdit);

  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.get('/admin/role/auth', controller.admin.role.auth);
  router.post('/admin/role/doAuth', controller.admin.role.doAuth);


  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.post('/admin/access/doAdd', controller.admin.access.doAdd);
  router.post('/admin/access/doEdit', controller.admin.access.doEdit);
  router.get('/admin/access/edit', controller.admin.access.edit);

  router.get('/admin/focus', controller.admin.focus.index);
  router.get('/admin/focus/add', controller.admin.focus.add);
  router.get('/admin/focus/edit', controller.admin.focus.edit);
  router.post('/admin/focus/doEdit', controller.admin.focus.doEdit);
  router.post('/admin/focus/doAdd', controller.admin.focus.doAdd);

  router.get('/admin/goodsType', controller.admin.goodsType.index);
  router.get('/admin/goodsType/add', controller.admin.goodsType.add);
  router.get('/admin/goodsType/edit', controller.admin.goodsType.edit);
  router.post('/admin/goodsType/doEdit', controller.admin.goodsType.doEdit);
  router.post('/admin/goodsType/doAdd', controller.admin.goodsType.doAdd);

  router.get('/admin/goodsTypeAttr', controller.admin.goodsTypeAttr.index);
  router.get('/admin/goodsTypeAttr/add', controller.admin.goodsTypeAttr.add);
  router.get('/admin/goodsTypeAttr/edit', controller.admin.goodsTypeAttr.edit);
  router.post('/admin/goodsTypeAttr/doEdit', controller.admin.goodsTypeAttr.doEdit);
  router.post('/admin/goodsTypeAttr/doAdd', controller.admin.goodsTypeAttr.doAdd);

  router.get('/admin/goodsCate', controller.admin.goodsCate.index);
  router.get('/admin/goodsCate/add', controller.admin.goodsCate.add);
  router.get('/admin/goodsCate/edit', controller.admin.goodsCate.edit);
  router.post('/admin/goodsCate/doEdit', controller.admin.goodsCate.doEdit);
  router.post('/admin/goodsCate/doAdd', controller.admin.goodsCate.doAdd);

  router.get('/admin/goods', controller.admin.goods.index);
  router.get('/admin/goods/add', controller.admin.goods.add);
  router.get('/admin/goods/edit', controller.admin.goods.edit);
  router.post('/admin/goods/doAdd', controller.admin.goods.doAdd);
  router.post('/admin/goods/doEdit', controller.admin.goods.doEdit);
  router.get('/admin/goods/goodsTypeAttr', controller.admin.goods.goodsTypeAttr);
  router.post('/admin/goods/upload', controller.admin.goods.upload);

};
