

/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.MenuItem = Dino.declare('Dino.widgets.MenuItem', 'Dino.Widget', /** @lends Dino.widgets.MenuItem.prototype */{
	
	$html: function() { return '<div></div>'; },
	
	defaultOptions: {
		showOnEnter: true,
		hideOnLeave: true,
		components: {
//			// содержимое эелемента меню (текст, виджет и др.)
			content: {
				weight: 1,
				dtype: 'text',
				onAction: function(e) {
					this.parent.events.fire('onAction', {'target': this.parent});
				}		
//				dtype: 'text-item'
			},
			// выпадающее подменю
			submenu: {
				dtype: 'dropdown-box',
				defaultItem: {
					dtype: 'menu-item',
					onAction: function(e) {
						this.parent.parent.events.fire('onAction', {'target': e.target});
					},					
					isLeaf: true
				},
				offset: [-1, 1]
			}
		}
	},
	
	$init: function() {
		Dino.widgets.MenuItem.superclass.$init.apply(this, arguments);
		
		var o = this.options;
		
		if('submenu' in o){
			o.components.submenu.items = o.submenu;
			this.states.set('has-submenu');
		}

//		if('submenuWidth' in o){
//			o.components.submenu.width = o.submenuWidth;
//		}
		
		if('subItem' in o.defaults){
			Dino.utils.overrideOpts(o.components.submenu.defaultItem, o.defaults.subItem, {defaults: {'subItem': o.defaults.subItem}});
		}
		
		
	},
	
	$events: function(self) {
		Dino.widgets.MenuItem.superclass.$events.apply(this, arguments);
		
		this.el.bind('mouseenter', function(){
			self.hoverSubmenu = true;
			if(self.intention) clearTimeout(self.intention);
			if(self.options.showOnEnter){
				self.intention = setTimeout(function(){
					self.intention = null;
					self.showSubmenu();					
				}, 300);
			}
		});
		
		this.el.bind('mouseleave', function(){
			self.hoverSubmenu = false;
			if(self.options.hideOnLeave){
				if(self.intention) clearTimeout(self.intention);
				if(self.submenu){
					self.intention = setTimeout(function(){
						self.intention = null;
						self.submenu.hide();
						self.events.fire('onSubmenuHide');
					}, 300);					
				}
			}
		});
		
	},
	
	hasSubmenu: function() {
		return !this.submenu.children.empty();
	},
	
	showSubmenu: function() {
		if(this.hasSubmenu()){
			if(this.submenu.options.anchor == 'bottom')
				this.submenu.show( 0, $(this.el).height());
			else
				this.submenu.show( $(this.el).width(), 0);
		}
	},
	
	hideSubmenu: function(hideAll) {
		if(this.hasSubmenu()){
			this.submenu.hide();
			this.events.fire('onSubmenuHide');			
		}		
		if(hideAll && this.options.isLeaf)
			this.parent.parent.hideSubmenu(true);
	}
	
	
	
}, 'menu-item');




/**
 * @class
 * @extends Dino.widgets.MenuItem
 */
Dino.widgets.TextMenuItem = Dino.declare('Dino.widgets.TextMenuItem', 'Dino.widgets.MenuItem', /** @lends Dino.widgets.TextMenuItem.prototype */{
	
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




/**
 * @class
 * @extends Dino.widgets.TextMenuItem
 */
Dino.widgets.CheckMenuItem = Dino.declare('Dino.widgets.CheckMenuItem', 'Dino.widgets.TextMenuItem', /** @lends Dino.widgets.CheckMenuItem.prototype */{
	
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







/**
 * @class
 * @extends Dino.containers.DropDownBox
 */
Dino.widgets.ContextMenu = Dino.declare('Dino.widgets.ContextMenu', 'Dino.containers.DropDownBox', /** @lends Dino.widgets.ContextMenu.prototype */{
	
	defaultOptions: {
		hideOn: 'hoverOut',
		baseCls: 'dino-context-menu',
		renderTo: 'body',
		defaultItem: {
			dtype: 'text-menu-item',
			onAction: function(e) {
				this.parent.events.fire('onAction', {target: e.target});
				this.parent.hide();
			}			
		},
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




