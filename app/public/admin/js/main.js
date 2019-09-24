'use strict';

$(function () {
  $('#delete').click(function () {
    return confirm('确定删除吗')
  })
})

function handleChangeStatus(el, model, id, val) {
  $.ajax({
    url: '/admin/status',
    method: 'put',
    data: { model, id, val },
    success: function (res) {
      val == 1 && $(el).attr('class', 'glyphicon glyphicon-ok')
      val == 0 && $(el).attr('class', 'glyphicon glyphicon-remove')
    }
  })
}
