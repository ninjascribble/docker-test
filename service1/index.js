var util = require('util');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.status(200);
	res.send('Hello from service 1');
});

app.get('/exit/:code', function(req, res) {
	console.log('Exiting with code: ', req.params.code);
	process.exit(req.params.code);
});

app.listen(8888, function() {
  var info = this.address();
  util.log('listening on ' + info.address + ':' + info.port);
});