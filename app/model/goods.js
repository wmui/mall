'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GoodsSchema = new Schema({
    title: {
      type: String,
      default: '',
    },
    sub_title: {
      type: String,
      default: '',
    },
    goods_sn: {
      type: String,
      default: '',
    },
    cate_id: {
      type: Schema.Types.ObjectId,
    },
    click_count: {
      type: Number,
      default: 100,
    },
    goods_number: {
      type: Number,
      default: 1000,
    },
    shop_price: {
      type: Number,
      default: 0,
    },
    market_price: {
      type: Number,
      default: 0,
    },
    relation_goods: {
      type: String,
      default: '',
    },
    goods_attrs: {
      type: String,
      default: '',
    },
    goods_version: { /* 版本*/
      type: String,
      default: '',
    },
    goods_img: {
      type: String,
      default: '',
    },
    goods_gift: {
      type: String,
      default: '',
    },
    goods_fitting: {
      type: String,
      default: '',
    },
    goods_color: {
      type: String,
      default: '',
    },
    goods_keywords: {
      type: String,
      default: '',
    },
    goods_description: {
      type: String,
      default: '',
    },
    goods_content: {
      type: String,
      default: '',
    },
    sort: {
      type: Number,
      default: 100,
    },
    is_delete: {
      type: Number,
    },
    is_hot: {
      type: Number,
      default: 0,
    },
    is_best: {
      type: Number,
      default: 0,
    },
    is_new: {
      type: Number,
      default: 0,
    },
    goods_type_id: {
      type: Schema.Types.Mixed, // 混合类型
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

  return mongoose.model('Goods', GoodsSchema, 'goods');

};
