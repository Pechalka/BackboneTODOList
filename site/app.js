var templateHtml = "<div class='row'><div class='span9' ><a href='#' id='showAdd' class='btn pull-right' >add</a></div></div><div id='addContainer'></div><div id='items'></div>";
var eventHtml = "<div class='modal'><div class='modal-header'><button type='button' class='close cansel' data-dismiss='modal' aria-hidden='true'>×</button><h3 id='myModalLabel'>Modal header</h3></div><div class='modal-body'><p><input type='text' id='title' value='<%= title %>'/></p></div><div class='modal-footer'><button class='btn cansel' data-dismiss='modal' aria-hidden='true'>Close</button><button class='btn btn-primary add'>Save changes</button></div></div><div class='modal-backdrop'></div>";
var eventItemHtml = "<div class='row' style='margin-top : 10px'><div class='span6'><p><%= title %></p></div><div class='span3 pull-right'><div class='btn-group'><a class='btn btn-primary dropdown-toggle' data-toggle='dropdown' href='#'>Action <span class='caret'></span></a><ul class='dropdown-menu'><li> <a class='edit' href='#'> <i class='icon-edit'></i> Edit </a> </li><li class='divider'></li><li> <a class='delete' href='#''> <i class='icon-trash'></i> Delete </a> </li></ul></div></div></div><div>";

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
