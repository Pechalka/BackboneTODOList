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
			var hash = this.model.toJSON();
			//{ title : this.$('#title').val() };
			
			hash.title = this.$('#title').val();

			if (this.model.isNew())
				this.model.save(hash);
			else
				this.collection.create(hash);
			
			this.remove();
		}
	});

	return EventView;
});