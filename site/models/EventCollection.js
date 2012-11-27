define(["backbone", "./Event"], function(Backbone, Event) {
	var EventCollection = Backbone.Collection.extend({
		url : '/api/events',
		model : Event,
		newEvent : function(){
			return new Event().toJSON();
		},
		saveOrCreate : function(event, hash){
			var collection = this;
			event.save(hash, {
				success : function() {
					collection.add(event);
					collection.trigger('save');
				}
			});
		}
	});
	return EventCollection;
});