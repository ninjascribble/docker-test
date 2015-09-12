var uuid = require('uuid');
var clientsService = require('../services/clientsService');

module.exports = {

	post: function(req, res) {

		var client = clientsService.create();

		res.type('json');
		res.status(200);
		res.send(client);
	},

	get: function(req, res) {

		var client = clientsService.findById(req.params['id']);

		res.type('json');
		res.status(200);
		res.send(client);
	}
}