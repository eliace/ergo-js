


Ergo.core.WidgetProperties = {


//	getText: function() {	return this.layout.el.text();	},
	getWidth: function() {	return this.el.width();	},
	getHeight: function() {	return this.el.height();	},
	
	
	
	
	setText: function(v) { 
		if(this.children.size() == 0)
			this.layout.el.text( v ); 
		else if(this.content)
			this.content.opt('text', v);
		else
			this.layout.el.text( v ); 		 
	},
	setInnerText: function(v) {	this.layout.el.text(v); },
	setInnerHtml: function(v) {	this.layout.el.html(v); },
	setOpacity: function(v) {
		if($.support.opacity) 
			this.el.css('opacity', v);
		else {
			this.el.css('filter', 'Alpha(opacity:' + (v*100.0) + ')');
			this.el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (v*100.0).toFixed() + ')');				
		}				
	},
	setWidth: function(v) { this.el.width(v); },
	setHeight: function(v) { this.el.height(v); },
	setAutoWidth: function(v) { v ? this.el.attr('autoWidth', v) : this.el.removeAttr('autoWidth'); },
	setAutoHeight: function(v) { 
		if(v) {
			this.el.attr('autoHeight', v);
			if(v === true)
				this.el.css('overflow-y', 'auto');
		}
		else {
			this.el.removeAttr('autoHeight');
			this.el.css('overflow-y', '');			
		}
	},
	setTooltip: function(v) { this.el.attr('title', v); },
	setId: function(v) { this.el.attr('id', v); },
	setTag: function(v) { this.tag = v; },
	setName: function(v) { this._name = v; },
//			'name': function(v) { this.name = v; },
	setTabIndex: function(v) { this.el.attr('tabindex', v); },			
	setFormat: function(v) {
		if($.isString(v)) this.options.format = Ergo.format_obj.curry(v);
	},
	setHidden: function(v) {
		this.el.css('display', v ? 'none' : '');
	}
	// setLead: function(v) { this.layout.el.prepend(v); },
	// setTrail: function(v) { this.layout.el.append(v); }
	
};
