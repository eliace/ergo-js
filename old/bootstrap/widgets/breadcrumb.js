
//= require "list"


Ergo.defineClass('Bootstrap.widgets.Breadcrumb', 'Bootstrap.widgets.List', {
	
	defaults: {
		html: '<ol/>',
		cls: 'breadcrumb',
		itemFactory: function(o) {
			if($.isString(o)) o = this.options.shortcuts[o] || {text: o};
			else if($.isArray(o)) o = {items: o};
			
			if(o.last)
				Ergo.smart_override(o, {etype: 'html:li', state: 'active'});
							
			return $.ergo( Ergo.smart_override({}, this.options.defaultItem, o) );
		}
	}
	
}, 'bootstrap:breadcrumb');

