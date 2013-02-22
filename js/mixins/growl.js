









Ergo.declare_mixin('Ergo.mixins.Growl', function(o) {

	
	var self = this;
	
	
	this.growl = {
		
		open: function(pos) {
			
			var container = $('.growl-container');
			
			if(container.length == 0) {
				container = new Ergo.mixins.Growl.Container({renderTo: 'body'});
			}
			
			container.push(self);
			
		},
		
		
		close: function() {
			
			//TODO
			
		}
		
		
	};
	




}, 'growl');




Ergo.declare('Ergo.mixins.Growl.Container', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<div/>',
		cls: 'growl-container',
		style: {'position': 'fixed'},

		defaultItem: {
			etype: 'widget',
			html: '<div/>',
			mixins: ['effects'],
			style: {'border': '1px solid transparent'},
			effects: {
				show: 'slideDown',
				hide: 'slideUp',
				delay: 300
			},
			content: {
				etype: 'widget',
				html: '<div/>',
				mixins: ['effects'],
				effects: {
					show: 'fadeIn',
					hide: 'fadeOut',
					delay: 500
				}
			}
		},
		
		direction: 'down',
		timeout: 20000
	},
	
	
	
	push: function(item) {
		
		
		
		var wrapper = this.items.add({
			content: item
		}, (this.options.direction == 'down') ? 0 : undefined);
		
		item = wrapper.content;
		
		wrapper.el.height(item.el.outerHeight(true));
		
		item.el.hide();
		wrapper.el.hide();
		
		var is_last = (this.options.direction == 'down' && wrapper.next() == null) || (this.options.direction == 'up' && wrapper.prev() == null) 
		
		$.when(is_last ? wrapper.el.show() : wrapper.show()).then(function(){
			item.show();
		});				
		
		
		if(this.options.timeout) {
			
			setTimeout(function(){
				
				item.hide().then(function(){
					wrapper.hide().then(function(){
						wrapper.destroy();
					});
				});
				
			}, this.options.timeout);
			
		}
		
		
	}
	
});

