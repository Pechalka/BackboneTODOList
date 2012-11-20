define(["backbone", "text!../tpl/eventModal.html"], 
function(Backbone, eventHtml) {
	var EventView = Backbone.View.extend({
		tpl: _.template(eventHtml),
		events : {
			'click .add' : 'save',
			'click .cansel' : 'cansel'
		},
		render : function() {
			var html = this.tpl(this.model.toJSON());
			this.$el.html(html);
			return this;
		},
		cansel : function(){
			this.remove();
		},
		save : function() {
			var event = this.model.toJSON();
			event.title = this.$('#title').val();
			this.model.save(event);
			this.remove();
		}
	});

	return EventView;
});