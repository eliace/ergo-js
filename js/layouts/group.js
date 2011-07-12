

//= require "plain"




Dino.declare('Dino.core.Layouts.GroupLayout', 'Dino.core.Layouts.PlainLayout', {
	
	
//	defaults: {
//		groups: ['default']
//	},
//	
//	
//	initialize: function(o) {
//		Dino.core.Layouts.GroupLayout.superclass.initialize.apply(this, arguments);
//		
//		this.groups = {};
//	},
	
	
	
	_add_to_set: function(elements, item, index) {
		
		if(index == null)
			elements.last().after( item.el );
		else if($.isNumber(index))
			elements.eq(index-1).after(item.el);
		else
			index.el.after(item.el);		
		
	},
	
	
	insert: function(item, index) {

		var selector = item.options.layoutSelector;
		
		var el = this.el;
		
		if(selector) {
			el = $.isFunction(selector) ? selector.call(this) : $(selector, this.el);
		}
		
		var group = item.options.layoutGroup || 'default';
		
		if(group == 'before') {
			var before = el.children().filter('.before');
			if(before.length == 0)
				el.prepend(item.el);
			else
				this._add_to_set(before, item, index);
				
			item.el.addClass('before');
		}
		else if(group == 'after') {
			var after = el.children().filter('.after');
			if(after.length == 0)
				el.append(item.el);
			else
				this._add_to_set(after, item, index);
				
			item.el.addClass('after');				
		}
		else {
			var other = el.children().not('.after').not('.before');
			if(other.length == 0) {
				var before = el.children().filter('.before');
				if(before.length == 0)
					el.prepend(item.el);
				else
					before.last().after(item.el);
			}
			else {
				this._add_to_set(other, item, index);				
			}						
		}
		
				
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
	}
		
}, 'group-layout');