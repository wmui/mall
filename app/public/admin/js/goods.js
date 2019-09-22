$(function () {
  $('#goods a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
})

$(function () {
  $('#goods_content').froalaEditor({
    height: 500,
    language: 'zh_cn',
    imageUploadURL: '/admin/goods/upload',
    //根据不同的分辨率加载不同的配置
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
      '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat',
      'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage',
      'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters',
      'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo',
      'redo'
    ],
    toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
      'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink',
      'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons',
      'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help',
      'html', '|', 'undo', 'redo'
    ],
    toolbarButtonsSM: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
      'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink',
      'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons',
      'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help',
      'html', '|', 'undo', 'redo'
    ]
  });
})


$(function () {
  var photoStr = '';
  $('#photo_btn').diyUpload({
    url: '/admin/goods/upload',
    success: function (response) {
      photoStr = '<input type="hidden" name="goods_image_list" value=' + response.link + ' />';
      $('#photo_list').append(photoStr);
    },
    error: function (err) {
      console.info(err);
    }
  });
})


$(function () {
  $('#cate_id').change(function () {
    var cate_id = $(this).val();
    $.get('/admin/goods/goodsTypeAttr?cate_id=' + cate_id, function (res) {
      $('#goods_type_attr').html(res)
    })
  })
})
