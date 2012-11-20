define(["backbone", "text!../tpl/eventItem.html"], 
function(Backbone, eventItemHtml) {
	var EventItemView = Backbone.View.extend({
		tpl: _.template(eventItemHtml),
		events : {
			'click .delete' : 'deleteEvent',
			'click .edit' : 'editEvent'
		},
		deleteEvent : function(e) {
			this.model.destroy();
			this.remove();
		},
		editEvent : function(e) {
			this.model.trigger('start_edit', this.model);
		},
		render : function(){
			var html = this.tpl(this.model.toJSON());
			this.$el.html(html);

			return this;
		}
	});

	return EventItemView;
});