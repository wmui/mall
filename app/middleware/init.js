'use strict';
module.exports = () => {
  return async (ctx, next) => {
    ctx.locals.csrf = ctx.csrf;

    ctx.locals.goodsCateList = await ctx.service.goods.goodsCateList();
    await next();
  };
};
