






/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.MenuItem = Dino.declare('Dino.widgets.MenuItem', 'Dino.widgets.TextItem', /** @lends Dino.widgets.MenuItem.prototype */{
	
//	$html: function() { return '<div></div>'; },
	
	defaultOptions: {
		style: {'position': 'relative', 'display': 'block'},
		baseCls: 'dino-menu-item',
		showOnEnter: true,
		hideOnLeave: true,
		xicon: true,
		components: {
//			content: {
//				dtype: 'text-item'
//			},
			// выпадающее подменю
			submenu: {
				dtype: 'menu-dropdown-box'
//				dtype: 'dropdown-box',
//				style: {'overflow-y': 'visible'},
//				hideOn: 'hoverOut',
//				defaultItem: {
//					dtype: 'menu-item'
////					onAction: function(e) {
////						this.parent.parent.events.fire('onAction', {'target': e.target});
////					},					
////					isLeaf: true
//				},
//				offset: [-1, 1]
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
	
	
//	$opt: function(o) {
//		Dino.widgets.MenuItem.superclass.$opt.apply(this, arguments);
//		
//		if('text' in o) this.content.opt('text', o.text);
//	},
	
	
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
				this.submenu.show( $(this.el).outerWidth(), 0);
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







Dino.declare('Dino.widgets.MenuDropDownBox', 'Dino.containers.DropDownBox', {
	
	defaultOptions: {
		hideOn: 'hoverOut',
		offset: [-1, 1],
		style: {'overflow-y': 'visible'},
		defaultItem: {
			dtype: 'menu-item'
		}
	}
	
	
//	defaultOptions: {
//		html: '<table cellspacing="0" cellpadding="0" border="0"><tbody/></table>',
//		defaultItem: {
//			dtype: 'box',
//			html: '<tr/>',
//			cls: 'menu-item',
//			defaultItem: {
//				dtype: 'box',
//				html: '<td/>'
//			},
//			items: [{
//				width: 24
//			}, {
//				dtype: 'text',							
//				width: 16
//			}, {
//			}]
//		}
//	}
	
	
	
}, 'menu-dropdown-box');














