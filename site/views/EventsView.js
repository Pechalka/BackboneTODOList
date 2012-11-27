define(["backbone",  "./EventItemView", "./PopupView", "/models/Event.js" , "text!../tpl/events.html"], 
function(Backbone, EventItemView, PopupView, Event,  templateHtml) {
	var EventsView = Backbone.View.extend({
		tpl: _.template(templateHtml),
		events : {
			'click #showAdd' : 'addEvent'
		},
		initialize : function() {
			this.collection.on('save destroy reset', this.renderItem, this);
		},
		render : function() {
			var html = this.tpl(this.collection.toJSON());
			this.$el.html(html);
		
			return this;
		},
		renderItem : function(){
			this.$('#items').empty();
			_.each(this.collection.models, function(event){
				event.on('start_edit', this.showPopup, this);

				var view = new EventItemView({ model : event });
				this.$('#items').append(view.render().el)
			}, this);
		},
		showPopup : function(event) {
			var view = new PopupView({ model : event, collection : this.collection });
			this.$('#addContainer').empty().append(view.render().$el);
		},
		addEvent : function() {
			var event = new Event();
			this.showPopup(event);
		}
	});

	return EventsView;
});