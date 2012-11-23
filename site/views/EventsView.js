define(["backbone",  "./EventItemView", "./PopupView", "/models/Event.js" , "text!../tpl/events.html"], 
function(Backbone, EventItemView, PopupView, Event,  templateHtml) {
	var EventsView = Backbone.View.extend({
		tpl: _.template(templateHtml),
		parent : '.container',
		events : {
			'click #showAdd' : 'addEvent'
		},
		initialize : function() {
			this.render();
			this.model.on('save destroy reset', this.renderItem, this);
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
				event.on('start_edit', this.showPopup, this);

				var view = new EventItemView({ model : event });
				this.$('#items').append(view.render().el)
			}, this);
		},
		showPopup : function(event) {
			var view = new PopupView({ model : event, collection : this.model });
			this.$('#addContainer').empty().append(view.render().$el);
		},
		addEvent : function() {
			var event = new Event();
			this.showPopup(event);
		}
	});

	return EventsView;
});