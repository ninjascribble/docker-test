var util = require('util');
var express = require('express');
var routes = require('./src/routes');
var app = express();

app.use(routes);

app.listen(8888, function() {
  var info = this.address();
  util.log('listening on ' + info.address + ':' + info.port);
});