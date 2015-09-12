var assert = require('chai').assert;
var request = require('supertest');
var app = require('express')();
var clientsService = require('../../src/services/clientsService');
var router = require('../../src/routes');

before(function() {
	app.use(router);
});

describe('POST /clients', function() {

	it('Returns a JSON response containing a UUID', function(done) {
		
		request(app)
			.post('/clients')
			.expect(200)
			.expect('Content-Type', /json/)
			.expect(function(res) {
				assert.match(res.body.id, /^[0-9a-f\-]{36}$/);
			})
			.end(done);
	});
});

describe('GET /clients/:id', function() {

	it('Returns a JSON response containing the requested client', function(done) {

		var key = null;
		
		request(app)
			.post('/clients')
			.expect(function(res) {
				key = res.body.id;
			})
			.end(function() {
				request(app)
					.get('/clients/' + key)
					.expect(200)
					.expect('Content-Type', /json/)
					.expect(function(res) {
						assert.equal(res.body.id, key);
					})
					.end(done);
			});
	});

	it('Returns undefined when the requested client is not found', function(done) {

		request(app)
			.get('/clients/missing')
			.expect(200)
			.expect('Content-Type', /json/)
			.expect(function(res) {
				assert.equal(res.body, '');
			})
			.end(done);
	});
});