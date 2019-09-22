'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GoodsAttrSchema = new Schema({
    goods_id: {
      type: Schema.Types.ObjectId,
    },
    cate_id: {
      type: Schema.Types.ObjectId,
    },
    attr_id: {
      type: Schema.Types.ObjectId,
    },
    attr_type: {
      type: String,
      default: '',
    },
    attr_title: {
      type: String,
      default: '',
    },
    attr_value: {
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

  return mongoose.model('GoodsAttr', GoodsAttrSchema, 'goods_attr');

};
