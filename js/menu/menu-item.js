






/**
 * @class
 * @extends Dino.Widget
 */
Dino.widgets.MenuItem = Dino.declare('Dino.widgets.MenuItem', 'Dino.containers.Box', /** @lends Dino.widgets.MenuItem.prototype */{
	
//	$html: function() { return '<div></div>'; },
	defaultCls: 'dino-menu-item',
	
	defaultOptions: {
		showOnEnter: true,
		hideOnLeave: true,
		layout:'dock-layout',
		components: {
			// выпадающее подменю
			content: {
				dtype: 'text'
			},
			icon: {
				dtype: 'icon',
				cls: 'dino-icon-right',
				dock: 'right',
				state: 'hidden'
			},
			submenu: {
				dtype: 'menu-dropdown-box',
				dataId: 'children',
				binding: function(val) {
					if(val && val.length > 0) this.parent.states.set('submenu');
				}
			}
		},
		states: {
			'submenu': function(on) {
				if(this.icon) this.icon.states.toggle('hidden', !on);
			}
		},
		events: {
			'click': function(e, w) {
				var event = new Dino.events.CancelEvent();
				w.events.fire('onAction', event);
				if(!event.isCanceled) w.hideSubmenu(true);
			}
		}
	},
	
	$init: function(o) {
		
		if('menuModel' in o) {
			Dino.utils.overrideOpts(o, o.menuModel.item);
			o.components.submenu.menuModel = o.menuModel;
		}		
		
		Dino.widgets.MenuItem.superclass.$init.apply(this, arguments);
		
		if('submenu' in o){
			o.components.submenu.items = o.submenu;
			//FIXME подозрительный код, потому что состояние submenu влияет на компонент icon, которого пока не создано
			this.states.set('submenu');
			o.components.icon.state = '';
		}

//		if('submenuWidth' in o){
//			o.components.submenu.width = o.submenuWidth;
//		}
		
//		if('subItem' in o.defaults){
//			Dino.utils.overrideOpts(o.components.submenu.defaultItem, o.defaults.subItem, {defaults: {'subItem': o.defaults.subItem}});
//		}		
		
	},
	
	
	$opt: function(o) {
		Dino.widgets.MenuItem.superclass.$opt.apply(this, arguments);
		
		if('text' in o) this.content.opt('text', o.text);
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
				this.submenu.show( $(this.el).outerWidth(), 0);
		}
	},
	
	hideSubmenu: function(hideAll) {
		if(this.hasSubmenu()){
			this.submenu.hide();
			this.events.fire('onSubmenuHide');
		}
		if(hideAll) {
			if(this.parent instanceof Dino.containers.MenuDropdownBox) this.parent.hideAll();
		}
//		if(hideAll) {// && this.options.isLeaf)
//			var parentMenuItem = this.getParent(Dino.widgets.MenuItem);
//			if(parentMenuItem) parentMenuItem.hideSubmenu(true);
//		}	
//			if(this.parent)this.parent.parent.hideSubmenu(true);
	}
	
	
	
}, 'menu-item');







Dino.declare('Dino.containers.MenuDropdownBox', 'Dino.containers.DropDownBox', {
	
	defaultCls: 'dino-menu-dropdown',
	
	defaultOptions: {
		cls: 'dino-menu-shadow',
		hideOn: 'hoverOut',
		offset: [-1, 1],
		dynamic: true,
		style: {'overflow-y': 'visible'},
		defaultItem: {
			dtype: 'menu-item'
		}
	},
	
	
	$init: function(o) {
		
		if('menuModel' in o) {
			Dino.utils.overrideOpts(o, o.menuModel.dropdown);
			o.defaultItem.menuModel = o.menuModel;
		}		
		
		Dino.containers.MenuDropdownBox.superclass.$init.apply(this, arguments);
				
//		if('defaultItem' in o)
//			Dino.utils.overrideOpts(o.defaultItem.components.submenu.defaultItem, o.defaultItem);//o.defaults.subItem, {defaults: {'subItem': o.defaults.subItem}});
		
	},
	
	hideAll: function() {
		this.hide();
		if(this.parent instanceof Dino.widgets.MenuItem) this.parent.hideSubmenu(true)
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













