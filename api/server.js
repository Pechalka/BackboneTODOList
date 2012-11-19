var express = require('express');
var app = express();

app.configure(function(){
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/../site'));
});

app.get('/api/events', function(req, res){
	res.json([
		{ title : 'events1', id : 1 },
		{ title : 'events2', id : 2 },
		{ title : 'events3', id : 3 }
		], 200);
});


app.post('/api/events', function(req, res) {
	res.json(req.body, 200);
});

app.put('/api/events', function(req, res) {
	res.json(req.body, 200);	
});




app.listen(8080, function(){
	console.log("Express server listening on port %d", '8080');
});
