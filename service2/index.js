var util = require('util');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.status(200);
	res.send('hello from service 2');
});

app.listen(8888, function() {
  var info = this.address();
  util.log('listening on ' + info.address + ':' + info.port);
});