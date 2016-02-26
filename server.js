// server.js

	// set up
	var express  = require('express');
	var app		 = express();				//create app with express
	var mongoose = require('mongoose');		// for mongoDB
	var morgan	 = require('morgan');		// log requests to the console (express4)
	var bodyParser = require('body-parser');// pull info from html POST (express4)
	var methodOverride = require('method-override'); //simulate DELETE and PUT (express4)

	// config8
	//mongoose.connect('mongodb://motornapila:harbija1@ds055945.mongolab.com:55945/motornapila'); //connect to mongodb on modulo.io
	mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');
	
	app.use(express.static(__dirname + '/public')); //set static files location, npr. /public/img will be /img for the user
	app.use(morgan('dev')); 						//log every request to the console
	app.use(bodyParser.urlencoded({'extended': 'true'})); //parse application/x-www-form-urlencoded
	app.use(bodyParser.json());						//parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse application/vnd.api+json as json
	app.use(methodOverride());

	// define model
	var Todo = mongoose.model('Todo', {
		text : String
	});

	//routes

		//api

		//get all todos
		app.get('/api/todos', function(req, res){
			//use mongoose to get all todos in the database
			
			Todo.find(function (err,todos){
				//if theres an error retreiving, send the error. Execute nothing after
				if(err)
					res.send(err);

				res.json(todos); //return all todos in JSON format
			});
		});

		//create todo and send back all todos after creation
		app.post('/api/todos', function(req, res){
			//create a todo, information comes from AJAX request from angular
			Todo.create({
				text: req.body.text,
				done: false
			}, function(err, todo){
				if (err)
					res.send(err);

				//get and return all todos after you create another
				Todo.find(function(err, todos){
					if(err)
						res.send(err);

					res.json(todos);

				});
			});
		});

		//delete a todo
		app.delete('/api/todos/:todo_id', function(req, res){
			Todo.remove({
				_id : req.params.todo_id
			}, function(err, todo){
				if(err)
					res.send(err);

				//get and return all the todos after you delete one
				Todo.find(function(err, todos){
					if (err)
						res.send(err);

					res.json(todos);
				});
			});
		});

	//application
	app.get('*', function(req, res){
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


	// listen (start app with node.js)
	app.listen(8080);
	console.log("App listening on port 8080");