'use strict';

const BaseController = require('./base.js');

class AccessController extends BaseController {
  async index() {
    const access = await this.ctx.model.Access.aggregate([
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

    await this.ctx.render('admin/access/index', {
      access,
    });
  }

  async add() {
    const modules = await this.ctx.model.Access.find({ module_id: 0 });
    modules.unshift({ _id: 0, module_name: '--顶级模块--' });
    await this.ctx.render('admin/access/add', {
      modules,
    });
  }

  async doAdd() {
    const { body } = this.ctx.request;

    if (body.module_id !== '0') body.module_id = this.service.tool.objectId(body.module_id);
    await new this.ctx.model.Access(body).save();

    await this.success('/admin/access', '增加权限成功');
  }


  async edit() {
    const id = this.ctx.request.query.id;
    // 获取编辑的数据
    const access = await this.ctx.model.Access.findOne({ _id: id });
    const modules = await this.ctx.model.Access.find({ module_id: 0 });
    modules.unshift({ _id: 0, module_name: '--顶级模块--' });

    await this.ctx.render('admin/access/edit', {
      access,
      modules,
    });
  }


  async doEdit() {
    const { body } = this.ctx.request;

    if (body.module_id === '0') {
      body.module_id = 0;
    } else {
      body.module_id = this.service.tool.objectId(body.module_id);
    }
    await this.ctx.model.Access.updateOne({ _id: body.id }, body);

    await this.success('/admin/access', '修改权限成功');
  }
}

module.exports = AccessController;
