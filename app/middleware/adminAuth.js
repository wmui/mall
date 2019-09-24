'use strict';
const url = require('url');
module.exports = () => {
  return async (ctx, next) => {
    // 全局变量
    ctx.locals.prevPage = ctx.request.headers.referer;
    ctx.locals.csrf = ctx.csrf;
    ctx.locals.focusType = {
      1: '网站',
      2: 'app',
      3: '小程序',
    };
    ctx.locals.fieldType = {
      1: '单行文本框',
      2: '多行文本框',
      3: '下拉选择框',
    };
    ctx.locals.nodeType = {
      1: '模块',
      2: '菜单',
      3: '操作',
    };
    // 无需鉴权的路由
    const ignorePath = [ '/admin/login', '/admin/doLogin', '/admin/verify' ];
    const pathname = url.parse(ctx.request.url).pathname;

    if (ignorePath.includes(pathname)) return await next();

    if (!ctx.session.userinfo) return ctx.redirect('/admin/login');
    // 路径和权限判断
    ctx.locals.userinfo = ctx.session.userinfo;

    const hasAuth = await ctx.service.manager.checkAuth();
    if (!hasAuth) return (ctx.body = '您没有访问权限');

    // 验证通过，获取可访问菜单列表
    const { role_id } = ctx.session.userinfo;
    ctx.locals.menus = await ctx.service.manager.getAuthList(role_id);

    await next();
  };
};
