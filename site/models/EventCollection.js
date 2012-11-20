define(["backbone", "./Event"], function(Backbone, Event) {
	var EventCollection = Backbone.Collection.extend({
		url : '/api/events',
		model : Event,
		newEvent : function(){
			return new Event().toJSON();
		},
		AddEvent : function(hash){
			this.add(hash);
		}
	});
	return EventCollection;
});