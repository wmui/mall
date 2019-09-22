'use strict';
const BaseController = require('./base');

class GoodsController extends BaseController {
  async goodsOther(body) {
    // goods photos
    if (body.goods_image_list) {
      let { goods_image_list } = body;
      if (typeof goods_image_list === 'string') goods_image_list = Array.of(goods_image_list);

      for (const item of goods_image_list) {
        await new this.ctx.model.GoodsImage({
          goods_id: body.id,
          img_url: item,
        }).save();
      }
    }

    if (body.type_attr_id && body.type_attr_value) {
      let { type_attr_id, type_attr_value } = body;
      if (typeof type_attr_id === 'string') {
        type_attr_id = Array.of(type_attr_id);
      }
      if (typeof type_attr_value === 'string') {
        type_attr_value = Array.of(type_attr_value);
      }

      for (let i = 0; i < type_attr_id.length; i++) {
        const element = type_attr_id[i];
        if (element) {
          const attr = await this.ctx.model.GoodsTypeAttr.findOne({ _id: element });
          await new this.ctx.model.GoodsAttr({
            goods_id: body.id,
            cate_id: body.cate_id,
            attr_id: element,
            attr_value: type_attr_value[i],
            attr_title: attr.attr_title,
            attr_type: attr.attr_type,
          }).save();
        }
      }
    }
  }

  async goodsCommon() {
    // 颜色最好配置到数据库
    const goods_colors = [
      {
        _id: '1',
        color_name: '红色',
        color_value: '#d0021b',
      },
      {
        _id: '2',
        color_name: '黄色',
        color_value: '#f8e71c',
      },
      {
        _id: '3',
        color_name: '绿色',
        color_value: '#417505',
      },
    ];
    const goods_types = await this.ctx.model.GoodsType.find({});
    const goods_cates = await this.ctx.model.GoodsCate.aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'items',
        },
      },
      {
        $match: {
          pid: '0',
        },
      },
    ]);
    return { goods_colors, goods_types, goods_cates };
  }

  async tmp(cate_id, attrs) {
    let goods_type_attrs = [];
    const data = await this.ctx.model.GoodsTypeAttr.find({ cate_id });
    // find value data by edit
    // TODO: edit goods is fail

    if (attrs) {
      const copyData = JSON.parse(JSON.stringify(data));
      goods_type_attrs = copyData.map(item => {
        const val = attrs.find(i => i.attr_id.toString() === item._id.toString());
        return {
          ...item,
          now_value: val && val.attr_value,
        };
      });
    } else {
      goods_type_attrs = data;
    }
    let str = '';
    goods_type_attrs.forEach(item => {
      if (item.attr_type === '1') {
        str += `
          <div class="main-input">
          <span>${item.title}</span>
          <input class="form-control" name="type_attr_value" value="${item.now_value}"></input>
          <input type="hidden" value="${item._id}" class="form-control" name="type_attr_id"></input>
          </div>`;
      }
      if (item.attr_type === '2') {
        str += `
          <div class="main-input">
          <span>${item.title}</span>
          <textarea class="form-control" name="type_attr_value" rows="5">${item.now_value}</textarea>
          <input type="hidden" value="${item._id}" class="form-control" name="type_attr_id"></input>
          </div>`;
      }
      if (item.attr_type === '3') {
        // \r\n is need
        const arr = item.attr_value.split('\r\n');
        let options = '';
        arr.forEach(i => {
          const selected = i === item.now_value ? 'selected' : '';
          options += `<option value="${i}" ${selected}>${i}</option>`;
        });

        str += `
          <div class="main-input">
          <span>${item.title}</span>
          <select name="type_attr_value">${options}</select>
          <input type="hidden" value="${item._id}" class="form-control" name="type_attr_id"></input>
          </div>`;
      }
    });
    return str;
  }
  async index() {
    const list = await this.ctx.model.Goods.find();
    await this.ctx.render('admin/goods/index', { list });
  }

  async add() {
    const data = await this.goodsCommon();
    await this.ctx.render('admin/goods/add', data);
  }

  async doAdd() {
    const body = await this.service.tool.getUploadFile();

    const goods = await new this.ctx.model.Goods(body).save();
    await this.goodsOther({ id: goods._id, ...body });
    await this.success('/admin/goods', '增加商品成功');
  }
  async edit() {
    const { id } = this.ctx.query;
    const data = await this.goodsCommon();
    const one = await this.ctx.model.Goods.findOne({ _id: id });
    // goods images
    const goods_images = await this.ctx.model.GoodsImage.find({ goods_id: id });
    // goods colors
    const goods_color = one.goods_color.map(i => ({ _id: i }));
    // goods attrs
    const attrs = await this.ctx.model.GoodsAttr.find({ goods_id: id });
    const goods_type_attrs = await this.tmp(one.cate_id, attrs);

    await this.ctx.render('admin/goods/edit', {
      one,
      goods_images,
      goods_color,
      goods_type_attrs,
      ...data,
    });
  }
  async doEdit() {
    const body = await this.service.tool.getUploadFile();

    const goods = await this.ctx.model.Goods.updateOne({ _id: body.id }, body).exec();

    // delete old attr data, then add new data
    await this.ctx.model.GoodsAttr.deleteOne({ goods_id: body.id });
    goods && await this.goodsOther(body);
    await this.success('/admin/goods', '编辑商品成功');
  }
  async upload() {
    const body = await this.service.tool.getUploadFile(true);
    this.ctx.body = { link: body.file };
  }

  async goodsTypeAttr() {
    const { cate_id } = this.ctx.query;
    const html = await this.tmp(cate_id);
    this.ctx.body = html;
  }
}

module.exports = GoodsController;
