var express = require('express');
var app = express();

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

app.get('/api/events', function(req, res){
	Event.find({}, function(err, events){
		res.json(events, 200);
	});
});


app.post('/api/events', function(req, res) {
	var newEvent = new Event(req.body);
	newEvent.save(function(err, data){
		res.json(data, 200);
	});
});

app.put('/api/events', function(req, res) {
	Event.findOne(req.body._id, function(err, event){
		event.title = req.body.title;//todo : find way to use hash
		event.save(function(e, updatedEvent){
			res.json(updatedEvent, 200);
		});
	});
});

app.delete('/api/events', function(req, res) {
	Event.findOne(req.body._id, function(err, event){
		event.remove();
		res.json(req.body, 200);
	});
});



app.listen(8080, function(){
	console.log("Express server listening on port %d", '8080');
});
