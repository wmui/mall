'use strict';
const url = require('url');
const Service = require('egg').Service;

class ManagerService extends Service {
  // check router view access
  async checkAuth() {
    const { is_super, role_id } = this.ctx.session.userinfo;
    const { RoleAccess, Access } = this.ctx.model;
    const pathname = url.parse(this.ctx.request.url).pathname;
    if (pathname === '/admin/logout' || is_super) return true;

    // 获取权限列表
    const list = await RoleAccess.find({ role_id });
    const accessList = list.map(item => item.access_id.toString());
    const access = await Access.findOne({ url: pathname });

    if (accessList.includes(access._id.toString())) return true;
    return false;
  }

  async getAuthList(role_id) {
    const { Access, RoleAccess } = this.ctx.model;
    // 自关联
    const result = await Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);

    const list = await RoleAccess.find({ role_id });
    const accessList = list.map(item => item.access_id.toString());

    // 把可访问菜单设置为true
    return result.map(item => {
      const items = item.items.map(i => ({
        ...i,
        checked: accessList.includes(i._id.toString()),
      }));
      return {
        ...item,
        checked: accessList.includes(item._id.toString()),
        items,
      };
    });
  }
}

module.exports = ManagerService;
