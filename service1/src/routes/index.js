var router = require('express').Router();
var health = require('./health');
var clients = require('./clients');

router.get('/health', health.ok);
router.post('/clients', clients.post);
router.get('/clients/:id', clients.get);

module.exports = router;