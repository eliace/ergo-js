
//= require <core/layout>

Ergo.declare('Ergo.layouts.AppLayout', 'Ergo.core.Layout', {
	
	defaults: {
		name: 'app',
		html: '<div class="content"><aside class="west hidden" autoheight="ignore-siblings"/><div class="west-split" autoheight="ignore-siblings"/><div class="center" autoheight="ignore-siblings"><div><div class="hack"/></div></div><div class="east-split" autoheight="ignore-siblings"/><aside class="east hidden" autoheight="ignore-siblings"/></div>'
	},
	
	
	select: function(item) {
		var region = item.options.region || item._key;
		if(region == 'west') {
			var el = $('aside.west', this.el).first();
			el.removeClass('hidden');
			return el;
		}
		if(region == 'east') {
			var el = $('aside.east', this.el).first();
			el.removeClass('hidden');
			return el;
		}
		if(region == 'center') return $('div.center > div', this.el).first();
		if(region == 'west-split') return $('div.west-split', this.el).first();
		if(region == 'east-split') return $('div.east-split', this.el).first();
		
		return this.el;
	},
	
	
	
	add: function(item) {
		item.options.autoHeight = true;
		this.$super.apply(this, arguments);
	}	
	
	
	
	
}, 'layouts:app');
