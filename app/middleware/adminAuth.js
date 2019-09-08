'use strict';
const url = require('url');
module.exports = () => {
  return async (ctx, next) => {
    // 全局变量
    ctx.locals.prevPage = ctx.request.headers.referer;

    // 无需鉴权的路由
    const ignorePath = [ '/admin/login', '/admin/doLogin', '/admin/verify' ];
    const pathname = url.parse(ctx.request.url).pathname;

    if (ignorePath.includes(pathname)) return await next();

    // 路径和权限判断
    ctx.locals.userinfo = ctx.session.userinfo;

    const hasAuth = ctx.service.Manager.checkAuth();
    if (!hasAuth) return (ctx.body = '您没有访问权限');

    // 验证通过，获取可访问菜单列表
    const { role_id } = ctx.session.userinfo;
    ctx.locals.menus = ctx.service.Manager.getAuthList(role_id);
    await next();
  };
};
