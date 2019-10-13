'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserTmp = new Schema({
    phone: {
      type: String,
      default: '',
    },
    add_day: { // 20190801
      type: String,
      default: '',
    },
    send_count: { // verify send count
      type: Number,
      default: 0,
    },
    sign: {
      type: String,
      default: '',
    },
    ip: {
      type: String,
      default: '',
    },
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });
  return mongoose.model('UserTmp', UserTmp, 'user_tmp');
};
