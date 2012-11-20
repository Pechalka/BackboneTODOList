define(["backbone"], function(Backbone) {
	var Event = Backbone.Model.extend({
		url : '/api/events',
		idAttribute: "_id",
		defaults : {
			title : ''
		}
	});
	return Event;
});
