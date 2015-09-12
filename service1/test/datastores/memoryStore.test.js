var assert = require('chai').assert;
var store = require('../../src/datastores/memoryStore').getInstance();

beforeEach(function() {
	store.purge();
});

describe('Insert data into the store', function() {

	it('requires a collection argument', function(done) {
		var fn = function() {
			store.insert(null, 'somevalue');
		};
		assert.throws(fn, 'collection is a required parameter');
		done();
	});

	it('requires a value argument', function(done) {
		var fn = function() {
			store.insert('somecollection', null);
		};
		assert.throws(fn, 'value is a required parameter');
		done();
	});

	it('inserts data and returns a key', function(done) {

		var collection = 'testdata';
		var value = 'somevalue';
		var key = store.insert(collection, value);

		assert.match(key, /^[0-9a-f\-]{36}$/);
		assert.equal(store.get(collection, key), value);

		done();
	});

	it('inserts duplicate data without throwing an error', function(done) {

		var collection = 'testdata';
		var value = 'somevalue';
		var key1 = store.insert(collection, value);
		var key2 = store.insert(collection, value);
		var key3 = store.insert(collection, value);

		assert.equal(store.get(collection, key1), value);
		assert.equal(store.get(collection, key2), value);
		assert.equal(store.get(collection, key3), value);

		done();
	});
});

describe('Get data from the store', function() {

	it('requires a collection argument', function(done) {
		var fn = function() {
			store.get(null, 'somevalue');
		};
		assert.throws(fn, 'collection is a required parameter');
		done();
	});

	it('requires a key argument', function(done) {
		var fn = function() {
			store.get('somecollection', null);
		};
		assert.throws(fn, 'key is a required parameter');
		done();
	});

	it('returns a value from the collection', function(done) {

		var collection = 'testdata';
		var value = 'somevalue';
		var key = store.insert(collection, value);

		assert.equal(store.get(collection, key), value);

		done();
	});

	it('returns undefined if the key is not in the collection', function(done) {

		var collection = 'testdata';
		var key = 'missingkey';

		assert.equal(store.get(collection, key), undefined);
		done();		
	});
});

describe('Update data in the store', function() {

	it('requires a collection argument', function(done) {
		var fn = function() {
			store.update(null, 'somekey', 'somevalue');
		};
		assert.throws(fn, 'collection is a required parameter');
		done();
	});

	it('requires a key argument', function(done) {
		var fn = function() {
			store.update('somecollection', null, 'somevalue');
		};
		assert.throws(fn, 'key is a required parameter');
		done();
	});

	it('requires a value argument', function(done) {
		var fn = function() {
			store.update('somecollection', 'somekey', null);
		};
		assert.throws(fn, 'value is a required parameter');
		done();
	});

	it('updates a value', function(done) {

		var collection = 'testdata';
		var value1 = 'value1';
		var value2 = 'value2';
		var key = store.insert(collection, value1);

		store.update(collection, key, value2);

		assert.equal(store.get(collection, key), value2);

		done();
	});

	it('throws an error if the key is missing', function(done) {

		var collection = 'testdata';
		var key = 'missingkey';
		var value = 'somevalue';
		var fn = function() {
			store.update(collection, key, value);
		}

		assert.throws(fn, 'the key was not found in the collection');

		done();
	});
});

describe('Delete data from the store', function() {

	it('requires a collection argument', function(done) {
		var fn = function() {
			store.delete(null, 'somekey');
		};
		assert.throws(fn, 'collection is a required parameter');
		done();
	});

	it('requires a key argument', function(done) {
		var fn = function() {
			store.delete('somecollection', null);
		};
		assert.throws(fn, 'key is a required parameter');
		done();
	});

	it('deletes a value from the collection', function(done) {

		var collection = 'testdata';
		var value = 'somevalue';
		var key = store.insert(collection, value);

		store.delete(collection, key);

		assert.equal(store.get(collection, key), undefined);

		done();
	});

	it('doesn\'t care if the key is not found in the collection', function(done) {

		var collection = 'testdata';
		var key = 'missingkey';

		store.delete(collection, key);

		done();
	});
});