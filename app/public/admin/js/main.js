'use strict';

$(function () {
  app.init()
})

var app = {
  init: function () {
    this.deleteConfirm()
  },

  deleteConfirm: function () {
    $('#delete').click(function () {
      return confirm('确定删除吗')
    })
  }
}
