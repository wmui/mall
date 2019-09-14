'use strict';

const BaseController = require('./base.js');

class ManagerController extends BaseController {
  async index() {
    const managers = await this.ctx.model.Manager.aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
    ]);

    await this.ctx.render('admin/manager/index', { managers });
  }

  async add() {
    const roles = await this.ctx.model.Role.find();
    await this.ctx.render('admin/manager/add', { roles });
  }

  async doAdd() {
    const { body } = this.ctx.request;
    const { Manager } = this.ctx.model;
    const user = await Manager.findOne({ username: body.username });
    if (user) return await this.error('/admin/manager/add', '该管理员已存在');

    await new Manager(body).save();
    await this.success('/admin/manager', '管理员添加成功');
  }

  async edit() {
    const { id } = this.ctx.query;
    const { Manager, Role } = this.ctx.model;

    const manager = await Manager.findOne({ _id: id });
    const roles = await Role.find();

    await this.ctx.render('admin/manager/edit', { manager, roles });
  }

  async doEdit() {
    const { id, password, ...rest } = this.ctx.request.body;
    const { Manager } = this.ctx.model;

    if (password) {
      await Manager.updateOne({ _id: id }, { password, ...rest });
    } else {
      await Manager.updateOne({ _id: id }, { ...rest });
    }
    await this.success('/admin/manager', '管理员信息成功');
  }
}

module.exports = ManagerController;
