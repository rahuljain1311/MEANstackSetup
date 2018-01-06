const User = require('./models/user');
const _ = require('lodash')
const Promise = require('bluebird');

const getAllUsers = () => {

	return new Promise((resolve) => {
		User.find(function(err, users) {

			// if there is an error retrieving, send the error. 
			// nothing after res.send(err) will execute
			if (err)
				return err;
			const names =  _.map(users, function(obj) {return _.pick(obj, ['_id', 'name'])})
			return resolve(names);
		});
	});
}

module.exports = function(app) {

	// server routes ===========================================================

	app.get('/api/users', function(req, res) {

		return getAllUsers().then((names) => {

			console.log('Get users = ', names);
			return res.json(names);
		});
	});

	app.post('/api/users', function(req, res) {
		// use mongoose to get all users in the database

		var user = new User({
			name: req.name,
			dates: []
		  });
		  user.save(function (err, results) {
			
			if (err)
			res.send(err);
			return getAllUsers().then((users) => {
				
				console.log('Post users = ', users);
				return res.json(users);
			});
		  });
	});

	app.delete('/api/user/:userId', function(req, res) {
		// use mongoose to get all users in the database

		User.remove({_id: req.params.userId}, function (err) {

			// if there is an error deleting, send the error. 
			if (err)
				res.send(err);
			return getAllUsers().then((users) => {
			
				console.log('Delete users = ', users);
				return res.json(users);
			});
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