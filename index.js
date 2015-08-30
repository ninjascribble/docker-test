var util = require('util');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.status(200);
	res.send('ok foo?');
});

app.listen(8888, function() {
  var info = this.address();
  util.log('docker-test NodeJS app is listening on ' + info.address + ':' + info.port);
});