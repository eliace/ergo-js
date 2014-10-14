


Ergo.core.WidgetProperties = {


//	getText: function() {	return this.layout.el.text();	},
	get_width: function() {	return this.el.width();	},
	get_height: function() {	return this.el.height();	},
	
	
	
	
	set_text: function(v) { 
		if(this.children.size() == 0)
			this.layout.el.text( v ); 
		else if(this.content)
			this.content.opt('text', v);
		else
			this.layout.el.text( v ); 		 
	},
	set_innerText: function(v) {	this.layout.el.text(v); },
	set_innerHtml: function(v) {	this.layout.el.html(v); },
	set_opacity: function(v) {
		if($.support.opacity) 
			this.el.css('opacity', v);
		else {
			this.el.css('filter', 'Alpha(opacity:' + (v*100.0) + ')');
			this.el.css('-ms-filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (v*100.0).toFixed() + ')');				
		}				
	},
	set_width: function(v) { this.el.width(v); },
	set_height: function(v) { this.el.height(v); },
	set_autoWidth: function(v) { v ? this.el.attr('autoWidth', v) : this.el.removeAttr('autoWidth'); },
	set_autoHeight: function(v) { 
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
	set_tooltip: function(v) { this.el.attr('title', v); },
	set_id: function(v) { this.el.attr('id', v); },
	set_tag: function(v) { this.tag = v; },
	set_name: function(v) { this._name = v; },
//			'name': function(v) { this.name = v; },
	set_tabIndex: function(v) { this.el.attr('tabindex', v); },			
	set_format: function(v) {
		if($.isString(v)) this.options.format = Ergo.format_obj.curry(v);
	},
	set_hidden: function(v) {
		this.el.css('display', v ? 'none' : '');
	}
	// setLead: function(v) { this.layout.el.prepend(v); },
	// setTrail: function(v) { this.layout.el.append(v); }
	
};
