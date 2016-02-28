// server.js

	// set up
	var express  = require('express');
	var app		 = express();				//create app with express
	var mongoose = require('mongoose');		// for mongoDB
	var port = process.env.PORT || 8080;
	var morgan	 = require('morgan');		// log requests to the console (express4)
	var bodyParser = require('body-parser');// pull info from html POST (express4)
	var methodOverride = require('method-override'); //simulate DELETE and PUT (express4)
	var database = require('./config/database');
	

	// config
	mongoose.connect(database.url); //connect to database on url in database.js
	
	app.use(express.static(__dirname + '/public')); //set static files location, npr. /public/img will be /img for the user
	app.use(morgan('dev')); 						//log every request to the console
	app.use(bodyParser.urlencoded({'extended': 'true'})); //parse application/x-www-form-urlencoded
	app.use(bodyParser.json());						//parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse application/vnd.api+json as json
	app.use(methodOverride());

	//load the routes
	require('./app/routes')(app); 


	// listen (start app with node.js)
	app.listen(port);
	console.log("App listening on port " + port);