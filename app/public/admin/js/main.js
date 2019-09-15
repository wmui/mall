'use strict';

$(function () {
  app.init()
})

var app = {
  init: function () {
    this.deleteConfirm()

    $('input[name="attr_type"]').change(function () {
      if ($(this).val() === '3') {
        $('#attr_value').show()
      } else {
        $('#attr_value').hide()
      }
    })
  },

  deleteConfirm: function () {
    $('#delete').click(function () {
      return confirm('确定删除吗')
    })
  },
}
