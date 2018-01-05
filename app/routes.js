var User = require('./models/user');

const getAllUsers = () => {

	User.find(function(err, users) {

		// if there is an error retrieving, send the error. 
		// nothing after res.send(err) will execute
		if (err)
			return err;
		return users; // return all users in JSON format
	});
}

module.exports = function(app) {

	// server routes ===========================================================

	app.get('/api/users', function(req, res) {

		return res.json(getAllUsers);
	});

	app.post('/api/users', function(req, res) {
		// use mongoose to get all users in the database

		var user = new User({
			name: req.name,
			dates: []
		  });
		  user.save(function (err, results) {
			return res.json(getAllUsers);
		  });
	});

	app.delete('/api/user/:userId', function(req, res) {
		// use mongoose to get all users in the database

		User.remove({_id: req.params.id}, function (err) {

			// if there is an error deleting, send the error. 
			if (err)
				res.send(err);
			return res.json(getAllUsers);
		});
	});


	// // Be called from Late Controller, used to mark users late
	// app.update('/api/user/:userId', function(req, res) {

	// 	// Here we will push a record into Dates [] of user

		
	// });

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};