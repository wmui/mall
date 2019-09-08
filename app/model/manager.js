'use strict';
const md5 = require('md5');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ManagerSchema = new Schema({
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      set: md5,
    },
    mobile: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      unique: true,
      default: '',
    },
    status: {
      type: Number,
      default: 1,
    }, // 启用、禁用
    role_id: {
      type: Schema.Types.ObjectId,
    },
    is_super: {
      type: Number,
      default: 0,
    }, // 1表示超级管理员

  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });


  return mongoose.model('Manager', ManagerSchema, 'manager');
};
