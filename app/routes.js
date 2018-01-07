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

	const isValid = (days, date) => { 
		const lateDateMoment = Moment(date); 
		const curDate = Moment();
		const limitDateMoment = Moment().subtract(days, 'days'); 
		if(Moment.duration(lateDateMoment.diff(limitDateMoment)) > 0 && Moment.duration(curDate.diff(lateDateMoment)) >= 0)
			return 1; 
		else return 0; 
	}

	app.get('/api/lateCount/:days/:userId', function(req, res) {

		return User.find({ '_id': req.params.userId }, function(request, users){

			const dates = users[0].dates;
			var noOfDays = 0;
			var lateCount = 0;
			_.forEach(dates, (obj) => {
				if(isValid(req.params.days, obj.date)) { 
					noOfDays++; 
					if(obj.isLate)
					lateCount++;
				}
			})
			console.log(JSON.stringify(dates));
			return res.json({
				noOfDays: noOfDays,
				lateCount: lateCount
			})
		});
	});


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};