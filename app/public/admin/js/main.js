'use strict';


function getNodeName(type) {
  var maps = {
    1: '模块',
    2: '菜单',
    3: '操作',
  };

  return maps[type];
}
