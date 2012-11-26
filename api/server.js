var express = require('express');

 

var app = express();
var _ = require('underscore');

app.api = function(url, collectionName, schema) {
	var Collection = mongoose.model(collectionName, schema);
	//get
	this.get(url, function(req, res){
		Collection.find({}, function(err, data){
			res.json(data, 200);
		});
	});	
	//create
	this.post(url, function(req, res){
		var newItem = new Collection(req.body);
		newItem.save(function(err, data){
			res.json(data, 200);
		});
	});

	//update
	this.put(url, function(req, res) {
		var dataForUpdate = _.omit(req.body, '_id');
		Collection.update(
			{ _id : req.body._id }, 
			{ $set : dataForUpdate , $inc: { version: 1 } },
			{ multi: false },  
			function(err, edited) {
				res.json(req.body, 200);
			}
		);
	});

	//delete
	this.delete(url, function(req, res) {
		Collection.findOne(req.body._id, function(err, item){
			item.remove();
			res.json(req.body, 200);
		});
	});
};

app.configure(function(){
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/../site'));
});

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new Schema({
	title : String
});
var Event = mongoose.model('Events', EventSchema);


mongoose.connect('mongodb://localhost/events');

app.on('close', function(error){
	mongoose.disconnect();
});




app.api('/api/events', 'Events', EventSchema);

// app.get('/api/events', function(req, res){
// 	Event.find({}, function(err, events){
// 		res.json(events, 200);
// 	});
// });


// app.post('/api/events', function(req, res) {
// 	var newEvent = new Event(req.body);
// 	newEvent.save(function(err, data){
// 		res.json(data, 200);
// 	});
// });

// app.put('/api/events', function(req, res) {
// 	var data = _.omit(req.body, '_id');
// 	Event.update(
// 		{ _id : req.body._id }, 
// 		{ $set : data , $inc: { version: 1 } },
// 		{ multi: false },  
// 		function(err, edited) {
// 			res.json(req.body, 200);
// 		}
// 	);
// });

// app.delete('/api/events', function(req, res) {
// 	Event.findOne(req.body._id, function(err, event){
// 		event.remove();
// 		res.json(req.body, 200);
// 	});
// });



app.listen(8080, function(){
	console.log("Express server listening on port %d", '8080');
});
