'use strict';
const md5 = require('md5');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const User = new Schema({
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      set: md5,
      required: true,
    },
    last_ip: {
      type: String,
      default: '',
    },
    email: {
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

  return mongoose.model('User', User, 'user');
};
