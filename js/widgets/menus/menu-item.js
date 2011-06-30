
//= require <containers/dropdown-list>
//= require <widgets/natives/all>
//= require <widgets/images/all>


/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.MenuItem = Dino.declare('Dino.widgets.MenuItem', 'Dino.widgets.Box', /** @lends Dino.widgets.MenuItem.prototype */{
	
	defaultCls: 'dino-menu-item',
	
	defaults: {
		showOnEnter: true,
		hideOnLeave: true,
		layout:'dock',
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
				dtype: 'menu-dropdown-list',
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
		onClick: function(e) {
			var event = new Dino.events.CancelEvent();
			// если не определено состояние disabled, то вызываем событие onAction
			if(!this.states.is('disabled')) 
				this.events.fire('onAction', e); 
			if(!event.isCanceled) this.hideSubmenu(true);
//			e.stopPropagation();
		}
	},
	
	$init: function(o) {
		
		if('menuModel' in o) {
			Dino.smart_override(o, o.menuModel.item);
			o.components.submenu.menuModel = o.menuModel;
		}		
		
		Dino.widgets.MenuItem.superclass.$init.apply(this, arguments);
		
		if('submenu' in o){
			Dino.smart_override(o.components.submenu, {content: {items: o.submenu}});
//			o.components.submenu.content.items = o.submenu;
			//FIXME подозрительный код, потому что состояние submenu влияет на компонент icon, которого пока не создано
			this.states.set('submenu');
			o.components.icon.state = '';
		}

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
//						self.submenu.hide();
						self.hideSubmenu();
						self.events.fire('onSubmenuHide');
					}, 300);					
				}
			}
		});
		
	},
	
	hasSubmenu: function() {
		return !this.submenu.children.is_empty();
	},
	
	showSubmenu: function() {
		if(this.hasSubmenu()){
			if(this.submenu.options.anchor == 'bottom')
				this.submenu.open( 0, $(this.el).height());
			else
				this.submenu.open( $(this.el).outerWidth(), 0);
		}
	},
	
	hideSubmenu: function(hideAll) {
		if(this.hasSubmenu()){
			this.submenu.close();
			this.events.fire('onSubmenuHide');
		}
		if(hideAll) {
			if(this.parent instanceof Dino.widgets.MenuDropdownList) this.parent.hideAll();
		}
//		if(hideAll) {// && this.options.isLeaf)
//			var parentMenuItem = this.getParent(Dino.widgets.MenuItem);
//			if(parentMenuItem) parentMenuItem.hideSubmenu(true);
//		}	
//			if(this.parent)this.parent.parent.hideSubmenu(true);
	}
	
	
	
}, 'menu-item');







Dino.declare('Dino.widgets.MenuDropdownList', 'Dino.containers.DropdownList', {
	
	defaultCls: 'dino-menu-dropdown',
	
	defaults: {
		cls: 'dino-menu-shadow',
		hideOn: 'hoverOut',
		offset: [-1, 1],
		style: {'overflow-y': 'visible'},
		
		dynamic: true,
		defaultItem: {
			dtype: 'menu-item'
		},
		defaultItemShortcuts: {
			'-': {
				dtype: 'split',
				state: 'horizontal' 
			}
		}
					
	},
	
	
	$init: function(o) {
		
		if('menuModel' in o) {
			Dino.smart_override(o, o.menuModel.dropdown);
			o.defaultItem.menuModel = o.menuModel;
		}		
		
		Dino.widgets.MenuDropdownList.superclass.$init.apply(this, arguments);
				
//		if('defaultItem' in o)
//			Dino.smart_override(o.defaultItem.components.submenu.defaultItem, o.defaultItem);//o.defaults.subItem, {defaults: {'subItem': o.defaults.subItem}});
		
	},
	
	hideAll: function() {
		this.close();
		if(this.parent instanceof Dino.widgets.MenuItem) this.parent.hideSubmenu(true)
	}
	
	
//	defaults: {
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
	
	
	
}, 'menu-dropdown-list');














