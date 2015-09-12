var assert = require('chai').assert;
var service = require('../../src/services/clientsService');

describe('Create clients', function() {

	it('creates clients and returns a UUID', function(done) {

		var client = service.create();

		assert.match(client.id, /^[0-9a-f\-]{36}$/);
		done();
	});
});