var id = 7;


var templateHtml = "<a href='#'' id='showAdd'>add</a><div id='addContainer'></div><% _.each(obj, function(i) { %>  <p><%= i.title %></p> <a href='#' class='delete' data-id='<%= i.id %>'>delete</a> <a href='#' class='edit' data-id='<%= i.id %>'>edit</a><% }); %>";
var eventHtml = "<input type='text' id='title' value='<%= title %>'/><a href='#' class='add'>add</a>";

var EventView = Backbone.View.extend({
	tpl: _.template(eventHtml),
	events : {
		'click .add' : 'save'
	},
	render : function() {
		var html = this.tpl(this.model.toJSON());
		this.$el.html(html);
		return this;
	},
	save : function() {
		var event = this.model.toJSON();
		event.title = this.$('#title').val();
		if (this.model.isNew()){
			event.id = id;
			id++;	
		}
		this.model.save(event);
		this.$('#title').val('');
	}
});

var EventsView = Backbone.View.extend({
	tpl: _.template(templateHtml),
	parent : '.container',
	events : {
		'click #showAdd' : 'addEvent',
		'click .delete' : 'deleteEvent',
		'click .edit' : 'editEvent'
	},
	initialize : function() {
		this.model.on('all', this.render, this);
	},
	render : function() {
		var html = this.tpl(this.model.toJSON());
		this.$el.html(html);
		$(this.parent).empty().append(this.$el);
		this.delegateEvents();

		return this;
	},
	deleteEvent : function(e) {
		var id = $(e.target).data('id');
		var event = this.model.get(id);
		this.model.remove(event);
	},
	editEvent : function(e) {
		var id = $(e.target).data('id');
		var event = this.model.get(id);
		this.changeOrCreateEvent(event);
	},
	changeOrCreateEvent : function(event) {
		var self = this;
		event.on('change', function(m) {
			self.model.add(m);
		});
		var view = new EventView({ model : event });
		this.$('#addContainer').empty().append(view.render().el);
	},
	addEvent : function() {
		var event = new Event();
		this.changeOrCreateEvent(event);
	}
});
var Event = Backbone.Model.extend({
	url : '/api/events',
	defaults : {
		title : ''
	}
});

var EventCollection = Backbone.Collection.extend({
	url : '/api/events',
	model : Event,
	initialize : function() {
		this.eventsView = new EventsView({ model : this });
	},
	show : function() {
		this.fetch();
	}
});


$(function() {
	//$('#test').click(function() {
		var events = new EventCollection;
		events.show();
	//});
});
