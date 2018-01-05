var User = require('./models/user');

module.exports = function(app) {

	// server routes ===========================================================
	// sample api route
	app.get('/api/users', function(req, res) {
		// use mongoose to get all users in the database

		User.find(function(err, users) {

			// if there is an error retrieving, send the error. 
			// nothing after res.send(err) will execute
			if (err)
				res.send(err);
			res.json(users); // return all users in JSON format
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};