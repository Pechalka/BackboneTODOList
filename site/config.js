

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

require([ "../models/EventCollection", "../views/EventsView", "bootstrap"], 
function( EventCollection, EventsView) {
	var events = new EventCollection;

	var view = new EventsView({ collection : events });	
	$('.container').empty().append(view.render().el);

	events.fetch();
});	
