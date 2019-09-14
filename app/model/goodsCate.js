'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsCateSchema = new Schema({
    title: {
      type: String,
    },
    cate_img: { // 分类缩略图
      type: String,
      default: '',
    },
    filter_attr: { // 筛选id
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    template: { // 指定当前分类的模板
      type: String,
      default: '',
    },
    pid: {
      type: Schema.Types.Mixed, // 混合类型：可以是父级分类ID，也可以是0
    },
    sub_title: { // seo相关的标题、关键字、描述
      type: String,
      default: '',
    },
    keywords: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: Number,
      default: 1,
    },
    sort: {
      type: Number,
      default: 100,
    },
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });


  return mongoose.model('GoodsCate', GoodsCateSchema, 'goods_cate');
};
