module.exports = {

	ok: function(req, res) {
		res.type('text');
		res.status(200);
		res.send('ok');
	}
}