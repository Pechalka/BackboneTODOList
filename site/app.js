var templateHtml = "<a href='#' id='showAdd'>add</a><div id='addContainer'></div><div id='items'></div>";
var eventHtml = "<input type='text' id='title' value='<%= title %>'/><a href='#' class='add'>save</a> <a href='#' class='cansel'>cansel</a>";
var eventItemHtml = "<p><%= title %></p> <a href='#' class='delete'>delete</a> <a href='#' class='edit' >edit</a>";

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
		this.model.trigger('tryEdit', this.model);
	},
	render : function(){
		var html = this.tpl(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
});

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
			var view = new EventItemView({ model : event });
			event.on('tryEdit', this.prepareToSave, this);

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
var Event = Backbone.Model.extend({
	url : '/api/events',
	idAttribute: "_id",
	defaults : {
		title : ''
	}
});

var EventCollection = Backbone.Collection.extend({
	url : '/api/events',
	model : Event
});


$(function() {
	var events = new EventCollection;
	var eventsView = new EventsView({ model : events });
	events.fetch();
});
