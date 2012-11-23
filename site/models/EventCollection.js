define(["backbone", "./Event"], function(Backbone, Event) {
	var EventCollection = Backbone.Collection.extend({
		url : '/api/events',
		model : Event,
		newEvent : function(){
			return new Event().toJSON();
		},
		saveOrCreate : function(event, hash){
			var self = this;
			event.save(hash, {
				success : function() {
					self.add(event);
					self.trigger('save');
				}
			});
		}
	});
	return EventCollection;
});