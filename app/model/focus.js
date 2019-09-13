'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FocusSchema = new Schema({
    title: {
      type: String,
      default: '',
    },
    type: { // 类型：网站、小程序、app等
      type: Number,
      default: 1,
    },
    focus_img: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    sort: {
      type: Number,
      default: 100,
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

  return mongoose.model('Focus', FocusSchema, 'focus');
};
