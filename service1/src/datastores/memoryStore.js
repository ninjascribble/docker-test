var uuid = require('uuid');
var instance = null;

var store = function() {
	this.cache = {};
};

store.prototype = {

	/**
	 * Returns the entire collection from the cache and creates an empty
	 * collection if one is not found.
	 *
	 * @param {string} collection
	 * @returns {Object} The entire collection
	 * @throws Throws an Error if collection is falsy
	 */
	collection: function(collection) {

		if (!collection) {
			throw new Error('collection is a required parameter');
		}

		if (!this.cache[collection]) {
			this.cache[collection] = {};
		}

		return this.cache[collection];
	},

	/**
	 * @param {string} collection
	 * @param {Object} value
	 * @returns {Object} The key of the inserted Object
	 * @throws Throws an Error if collection is falsy
	 * @throws Throws an Error if value is falsy
	 */
	insert: function(collection, value) {

		if (!value) {
			throw new Error('value is a required parameter');
		}

		var key = uuid();

		this.collection(collection)[key] = value;
		return key;
	},

	/**
	 * @param {string} collection
	 * @param {string} key
	 * @returns {Object} The value from the collection or `undefined`
	 * @throws Throws an Error if collection is falsy
	 * @throws Throws an Error if key is falsy
	 */
	get: function(collection, key) {

		if (!key) {
			throw new Error('key is a required parameter');
		}

		return this.collection(collection)[key];
	},

	/**
	 * @param {string} collection
	 * @param {string} key
	 * @param {Object} value
	 * @throws Throws an Error if collection is falsy
	 * @throws Throws an Error if key is falsy
	 * @throws Throws an Error if value is falsy
	 * @throws Throws an Error if the key is not found within the collection
	 */
	update: function(collection, key, value) {

		if (!value) {
			throw new Error('value is a required parameter');
		}

		if (!key) {
			throw new Error('key is a required parameter');
		}

		if (this.get(collection, key) === undefined) {
			throw new Error('the key was not found in the collection');
		}

		this.collection(collection)[key] = value;
	},

	/**
	 * @param {string} collection
	 * @param {string} key
	 * @throws Throws an Error if collection is falsy
	 * @throws Throws an Error if key is falsy
	 */
	delete: function(collection, key) {

		if (!key) {
			throw new Error('key is a required parameter');
		}

		delete this.collection(collection)[key];
	},

	/**
	 * Empties the collection or the entire cache if a collection is not provided.
	 * @param {string} [collection]
	 */
	purge: function(collection) {
		if (collection) {
			this.cache[collection] = null;
			delete this.cache[collection];
		}
		else {
			this.cache = {};
		}
	}
};

module.exports = {

	getInstance: function() {
		if (!instance) {
			instance = new store();
		}
		return instance;
	}
};