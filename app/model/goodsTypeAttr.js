'use strict';
// 手机：cpu、内存、相机
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsTypeAttrSchema = new Schema({
    cate_id: {
      type: Schema.Types.ObjectId, // goodsType表的id
    },
    title: {
      type: String,
      default: '',
    },
    attr_type: {
      type: String,
      default: 1,
    }, // 类型: 1 input  2  textarea    3、select
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


  return mongoose.model('GoodsTypeAttr', GoodsTypeAttrSchema, 'goods_type_attr');
};
