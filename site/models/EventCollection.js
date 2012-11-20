define(["backbone", "./Event"], function(Backbone, Event) {
	var EventCollection = Backbone.Collection.extend({
		url : '/api/events',
		model : Event
	});
	return EventCollection;
});