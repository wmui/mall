'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsTypeSchema = new Schema({
    title: {
      type: String,
      defaulr: '',
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


  return mongoose.model('GoodsType', GoodsTypeSchema, 'goods_type');
};
