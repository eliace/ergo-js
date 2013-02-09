



Ergo.declare('Ergo.widgets.Growl', 'Ergo.widgets.Box', {
	
	defaults: {
		style: {'position': 'fixed'},//, 'top': 0},//, 'right': 0},

		defaultItem: {
			mixins: ['effects'],
			style: {'border': '1px solid transparent'},
			effects: {
				show: 'slideDown',
				hide: 'slideUp',
				delay: 300
			},
			content: {
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
	
}, 'growl');
