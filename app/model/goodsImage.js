'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsImageSchema = new Schema({
    goods_id: {
      type: Schema.Types.ObjectId,
    },
    img_url: {
      type: String,
      default: '',
    },
    color_id: {
      type: Schema.Types.Mixed, // 混合类型
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

  return mongoose.model('GoodsImage', GoodsImageSchema, 'goods_image');
};
