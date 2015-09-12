var client = require('../models/client');
var store = require('../datastores/memoryStore').getInstance();
var collection = 'clients';

module.exports = {

	create: function() {

		var c = new client();
		var id = store.insert(collection, c);

		return this.findById(id);
	},

	findById: function(id) {

		var c = store.get(collection, id);

		if (c) c.id = id;

		return c;
	}
}