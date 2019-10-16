'use strict';
module.exports = app => {
  require('./router/admin')(app);
  require('./router/default')(app);
  require('./router/api')(app);
};
