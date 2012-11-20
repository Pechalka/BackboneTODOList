define(["backbone",  "./EventItemView", "./EventView", "/models/Event.js" , "text!../tpl/events.html"], 
function(Backbone, EventItemView, EventView, Event,  templateHtml) {
	var EventsView = Backbone.View.extend({
		tpl: _.template(templateHtml),
		parent : '.container',
		events : {
			'click #showAdd' : 'addEvent'
		},
		initialize : function() {
			this.render();
			this.model.on('all', this.renderItem, this);
		},
		render : function() {
			var html = this.tpl(this.model.toJSON());
			this.$el.html(html);

			$(this.parent).empty().append(this.$el);
		
			return this;
		},
		renderItem : function(){
			console.log('render items');
			this.$('#items').empty();
			_.each(this.model.models, function(event){
				event.on('tryEdit', this.prepareToSave, this);

				var view = new EventItemView({ model : event });
				this.$('#items').append(view.render().el)
			}, this);
		},
		prepareToSave : function(event) {
			var self = this;
			event.on('change', function(m) {
				self.model.add(m);
			});
			var view = new EventView({ model : event });
			this.$('#addContainer').empty().append(view.render().$el);
		},
		addEvent : function() {
			var event = new Event();
			this.prepareToSave(event);
		}
	});

	return EventsView;
});