'use strict';

/* eslint-disable no-unused-vars */
module.exports = (options, app) => {
  return async (ctx, next) => {
    const userinfo = ctx.service.cookies.get('userinfo');
    if (userinfo && userinfo._id && userinfo.phone) {
      // 判断数据库里面有没有当前用户
      const user = await ctx.model.User.findOne({
        _id: userinfo._id,
        phone: userinfo.phone,
      });

      if (user) {
        await next();
      } else {
        ctx.redirect('/login');
      }
    } else {
      ctx.redirect('/login');
    }
  };
};
