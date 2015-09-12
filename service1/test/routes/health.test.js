var assert = require('chai').assert;
var request = require('supertest');
var app = require('express')();
var router = require('../../src/routes');

before(function() {
	app.use(router);
});

describe('GET /health', function() {

	it('says that everything is ok', function(done) {
		
		request(app)
			.get('/health')
			.expect(200)
			.expect('Content-Type', /^text\/plain/)
			.expect('ok')
			.end(done);
	});
});