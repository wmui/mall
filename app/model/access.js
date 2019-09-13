'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AccessSchema = new Schema({
    module_name: {
      type: String,
      required: true,
    }, // 模块名称或菜单名称
    type: {
      type: Number,
      default: 1,
    }, // 1、表示模块   2、表示菜单   3、操作
    action_name: {
      type: String,
      default: '',
    }, // 如果type是模块，操作名称就是子菜单的名称。如果是操作，就是具体的操作名称
    url: {
      type: String,
      default: '',
    },
    module_id: { // 可以是0，也可以是顶级模块的id。0表示是顶级模块
      type: Schema.Types.Mixed,
      default: 0,
    },
    sort: {
      type: Number,
      default: 100,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: Number,
      default: 1,
    },
  }, {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });
  return mongoose.model('Access', AccessSchema, 'access');
};
