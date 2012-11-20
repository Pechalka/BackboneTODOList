

require.config({
	paths : {
		'jquery' : '../libs/jquery/jquery.min',
		'backbone' : '../libs/backbone/backbone-min',
		'underscore' : '../libs/underscore/underscore-min',
		'bootstrap' : '../bootstrap/js/bootstrap.min',

		'text' : '../libs/require/text'
	},

	shim : {
		'backbone' : {
			deps : ["jquery", "underscore"],
			exports : "Backbone"
		},
		'bootstrap' : ["jquery"]
	}
});

require([ "../models/EventCollection", "../views/EventsView", "bootstrap"], function( EventCollection, EventsView) {
	var events = new EventCollection;
	var eventsView = new EventsView({ model : events });
	events.fetch();
});	

// require([ 
// 	"../models/EventCollection",
// 	"../models/Event",	 
// 	"../views/EventView"

// 	, "bootstrap"

// 	], 
// function(EventCollection, Event, EventView) {
// 	var save = function(model, title)
// 	{
// 		//var event = model.toJSON();
// 		//event.title = title;
// 		//model.save({
// 	//		title : title
// 	//	});
// 	};

// 	var events = new EventCollection;
// 	// events.on('change', function(){
// 	// 	console.log('change');
// 	// });
// 	// events.on('add', function(){
// 	// 	console.log('change');
// 	// });

// 	var renderItem = function(){
// 		console.log('renderItem');
// 	};
// 	var render = function(){
// 		console.log('render');
// 		renderItem();
// 	};

// 	var init = function(){
// 		events.on('reset', render);
// 		events.on('change', renderItem);
// 	}

// 	init()
	

//   	events.fetch();
// 	var index = 1;
//  	var model = //new Event();
// 	events.at(index);
	
// 	var hash = model.toJSON();

// 	hash.title = 'hello56782';

// 	if (!model.isNew())
// 		model.save(hash);

//  });