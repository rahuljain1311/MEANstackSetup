const User = require('./models/user');
const _ = require('lodash')
const Promise = require('bluebird');
const Moment = require('moment');

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

			return res.json(names);
		});
	});

	app.post('/api/user/:userName', function(req, res) {

		var user = new User({
			name: req.params.userName,
			dates: []
		  });
		  user.save(function (err, results) {
			
			if (err)
			res.send(err);
			return getAllUsers().then((users) => {
				
				return res.json(users);
			});
		  });
	});

	app.delete('/api/user/:userId', function(req, res) {

		User.remove({_id: req.params.userId}, function (err) {

			// if there is an error deleting, send the error. 
			if (err)
				res.send(err);
			return getAllUsers().then((users) => {
			
				return res.json(users);
			});
		});
	});

	// Be called from Late Controller, used to mark users late
	app.put('/api/user/:userId', function(req, res) {

		// Here we will push a record into Dates [] of user
		return User.find({ '_id': req.params.userId }, function(request, users) {

			console.log('request object  = ', req.body);			
			users[0].dates.push({
				date: Moment(req.body.date).format('MMM D, YYYY'),
				isLate: req.body.isLate
			});
			const updatedUser = users[0];		
			return User.update({ '_id': req.params.userId }, updatedUser, function (updateRequest, updateReponse){

				return getAllUsers().then((users) => {

					return res.json(users);
				});
			});
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};