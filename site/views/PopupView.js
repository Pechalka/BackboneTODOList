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
			this.collection.saveOrCreate(
				this.model, 
				{ title : this.$('#title').val()}
			);
			
			this.remove();
		}
	});

	return EventView;
});