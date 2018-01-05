
// const Model = require('./models/Nerd');


// grab the mongoose module
// var mongoose = require('mongoose');
// Nerds = mongoose.model('Nerd', {
// 	name : {type : String, default: ''}
// });

var Nerd = require('./models/nerd');

module.exports = function(app) {

	// server routes ===========================================================
	// sample api route
	app.get('/api/nerds', function(req, res) {
		// use mongoose to get all nerds in the database
		console.log('Hi there !!');


		Nerd.find(function(err, nerds) {

			// if there is an error retrieving, send the error. 
			// nothing after res.send(err) will execute
			if (err)
				res.send(err);
			console.log('nerds = ', nerds);

			res.json(nerds); // return all nerds in JSON format
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};