




/*
Dino.widgets.TextMenuItem = Dino.declare('Dino.widgets.TextMenuItem', 'Dino.widgets.MenuItem', {
	
	defaultOptions: {
		baseCls: 'dino-menu-item',
		components: {
			content: {
				dtype: 'text-item',
				xicon: 'dino-submenu-icon'
			},
			submenu: {
				defaultItem: {
					dtype: 'text-menu-item'
				}
			}
		},
		showLeftPanel: false
	},
	
	$opt: function(o) {
		Dino.widgets.TextMenuItem.superclass.$opt.call(this, o);
		
		if('text' in o) this.content.opt('text', o.text);
		if('format' in o) this.content.opt('format', o.format);
		
		if(o.showLeftPanel) this.content.states.set('left-panel');
	},
	
	getText: function() {
		return this.content.getText();
	}
	
	
}, 'text-menu-item');
*/


/*
Dino.widgets.CheckMenuItem = Dino.declare('Dino.widgets.CheckMenuItem', 'Dino.widgets.TextMenuItem', {
	
	defaultOptions: {
		components: {
			content: {
				components: {
					leftIcon: {
						dtype: 'checkbox'
					}
				}
			}
		}
	},
	
	getText: function() {
		return this.content.getText();
	}
	
	
}, 'check-menu-item');
*/






/**
 * @class
 * @extends Dino.containers.DropdownBox
 */
Dino.widgets.ContextMenu = Dino.declare('Dino.widgets.ContextMenu', 'Dino.widgets.MenuDropdownBox', /** @lends Dino.widgets.ContextMenu.prototype */{
	
	defaultOptions: {
//		hideOn: 'hoverOut',
		baseCls: 'dino-context-menu',
		renderTo: 'body',
		menuModel: {
			item: {
				onAction: function() {
					this.getParent(Dino.widgets.ContextMenu).events.fire('onSelect', {target: this});
				}
			}
		},
//		defaultItem: {
//			dtype: 'menu-item',
//			onAction: function(e) {
//				this.parent.events.fire('onAction', {target: e.target});
//				this.parent.hide();
//			}			
//		},
		offset: [-2, -2]
	}
	
/*	
	$events: function(self){
		Dino.widgets.ContextMenu.superclass.$events.call(this, self);
		
		this.el.bind('mouseleave', function(){ 
			if(self.options.hideOn == 'hoverOut') self.hide(); 
		});
	}
	
/*		
	show: function(x, y) {
		Dino.widgets.ContextMenu.superclass.show.apply(this, arguments);

		var self = this;
		
		if(this.options.hideOn == 'outerClick')
			$('body').one('click', function(){ self.hide(); });
				
	}
*/	
	
	
}, 'context-menu');




