'use strict';

const BaseController = require('./base.js');

class RoleController extends BaseController {
  async index() {
    const list = await this.ctx.model.Role.find();
    await this.ctx.render('admin/role/index', { list });
  }

  async add() {
    await this.ctx.render('admin/role/add');
  }

  async doAdd() {
    const { body } = this.ctx;
    await new this.ctx.model.Role(body).save();
    await this.success('/admin/role', '增加角色成功');
  }

  async edit() {
    const { id } = this.ctx.query;
    const role = await this.ctx.model.Role.findOne({ _id: id });
    await this.ctx.render('admin/role/edit', { role });
  }

  async doEdit() {
    const { id, ...rest } = this.ctx.request.body;
    await this.ctx.model.Role.updateOne({ _id: id }, { ...rest });
    await this.success('/admin/role', '编辑角色成功');
  }

  async auth() {
    const { role_id } = this.ctx.request.query;
    const access = await this.service.manager.getAuthList(role_id);
    await this.ctx.render('admin/role/auth', {
      access,
      role_id,
    });
  }

  async doAuth() {
    const { RoleAccess } = this.ctx.model;
    const { role_id, access_node } = this.ctx.request.body;
    // 1、删除当前角色下面的所有权限
    await RoleAccess.deleteMany({ role_id });
    // 2、给role_access增加数据 把获取的权限和角色增加到数据库
    for (const item of access_node) {
      await new RoleAccess({
        role_id,
        access_id: item,
      }).save();
    }
    await this.success('/admin/role/auth?role_id=' + role_id, '授权成功');
  }
}

module.exports = RoleController;
