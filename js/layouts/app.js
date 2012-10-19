
//= require <core/layout>

Ergo.declare('Ergo.layouts.AppLayout', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'app',
		html: '<div class="content"><aside class="west" autoheight="ignore-siblings"/><div class="center" autoheight="ignore-siblings"><div><div class="hack"/></div></div><aside class="east" autoheight="ignore-siblings"/></div>'
	},
	
	
	select: function(item) {
		var region = item.options.region || item._key;
		if(region == 'west') return $('aside.west', this.el);
		if(region == 'east') return $('aside.east', this.el);
		if(region == 'center') return $('div.center > div', this.el);
		return this.el;
	},
	
	
	
	add: function(item) {
		item.options.autoHeight = true;
		this.$super.apply(this, arguments);
	}	
	
	
	
	
}, 'layouts:app');
