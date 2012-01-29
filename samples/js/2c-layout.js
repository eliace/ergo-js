


Ergo.declare('Ergo.layouts.TwoColumnLayout', 'Ergo.core.Layout', {
	
	defaults: {
		html: '<div class="container" autoheight="ignore-siblings"><div class="content"/></div><aside class="left_bar" autoheight="ignore-siblings"/>'
	},
	
	
	select: function(item) {
		if(item.options.region == 'sidebar') return this.el.filter('.left_bar');
		return this.el.filter('.container').find('.content');
	},
	
	
	insert: function(item) {
		this.$super.apply(this, arguments);
		item.options.autoHeight = true;
	}
	
	
}, '2c-layout');






$(document).ready(function(){
	
	
	var w = $.ergo({
		etype: 'box',
		renderTo: 'body',
		cls: 'wrapper',
		
		components: {
			header: {
				cls: 'header',
				text: 'Шапка'
			},
			content: {
				layout: '2c',
				cls: 'middle',
				html: '<section/>',
				components: {
					sidebar: {
						region: 'sidebar',
						text: 'Левая панель'
					},
					content: {
					}
				}
			},
			footer: {
				cls: 'footer'
			}
		}
		
	});
	
	
	w.$layoutChanged();
	
});
