
//= require <containers/dropdown-list>
//= require <widgets/natives/all>
//= require <widgets/images/all>


/**
 * @class
 * @extends Ergo.core.Widget
 */
Ergo.widgets.MenuItem = Ergo.declare('Ergo.widgets.MenuItem', 'Ergo.widgets.Box', /** @lends Ergo.widgets.MenuItem.prototype */{
	
	defaultCls: 'ergo-menu-item',
	
	defaults: {
		showOnEnter: true,
		hideOnLeave: true,
		layout:'dock',
		components: {
			// выпадающее подменю
			content: {
				etype: 'text'
			},
			icon: {
				etype: 'icon',
				cls: 'ergo-icon-right',
				dock: 'right',
				state: 'hidden'
			},
			submenu: {
				etype: 'menu-dropdown-list',
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
			var event = new Ergo.events.CancelEvent();
			// если не определено состояние disabled, то вызываем событие onAction
			if(!this.states.is('disabled')) 
				this.events.fire('onAction', e); 
			if(!event.isCanceled) this.hideSubmenu(true);
//			e.stopPropagation();
		},
		set: {
			'text': function(v) {
				this.content.opt('text', v);				
			}
		}			
	},
	
	$init: function(o) {
		
		if('menuModel' in o) {
			Ergo.smart_override(o, o.menuModel.item);
			o.components.submenu.menuModel = o.menuModel;
		}		
		
		this.$super(o);
//		Ergo.widgets.MenuItem.superclass.$init.apply(this, arguments);
		
		if('submenu' in o){
			Ergo.smart_override(o.components.submenu, {items: o.submenu});
//			o.components.submenu.content.items = o.submenu;
			//FIXME подозрительный код, потому что состояние submenu влияет на компонент icon, которого пока не создано
//			this.states.set('submenu');
//			o.components.icon.state = '';
		}

	},
	
	
	$construct: function(o) {
		this.$super(o);
//		Ergo.widgets.MenuItem.superclass.$construct.apply(this, arguments);
		
		if('submenu' in o){
			this.states.set('submenu');
			this.icon.states.clear('hidden');
		}
						
	},
	
	
	// $opt: function(o) {
		// Ergo.widgets.MenuItem.superclass.$opt.apply(this, arguments);
// 		
// //		if('text' in o) this.content.opt('text', o.text);
	// },
	
	
	$events: function(self) {
		this.$super(self);
//		Ergo.widgets.MenuItem.superclass.$events.apply(this, arguments);
		
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
			if(this.parent instanceof Ergo.widgets.MenuDropdownList) this.parent.hideAll();
		}
//		if(hideAll) {// && this.options.isLeaf)
//			var parentMenuItem = this.getParent(Ergo.widgets.MenuItem);
//			if(parentMenuItem) parentMenuItem.hideSubmenu(true);
//		}	
//			if(this.parent)this.parent.parent.hideSubmenu(true);
	}
	
	
	
}, 'menu-item');







Ergo.declare('Ergo.widgets.MenuDropdownList', 'Ergo.containers.DropdownList', {
	
	defaultCls: 'ergo-menu-dropdown',
	
	defaults: {
		cls: 'ergo-menu-shadow',
		hideOn: 'hoverOut',
		offset: [-1, 1],
		style: {'overflow-y': 'visible'},
		
		dynamic: true,
		defaultItem: {
			etype: 'menu-item'
		},
		defaultItemShortcuts: {
			'-': {
				etype: 'split',
				state: 'horizontal' 
			}
		}
					
	},
	
	
	$init: function(o) {
		
		if('menuModel' in o) {
			Ergo.smart_override(o, o.menuModel.dropdown);
			o.defaultItem.menuModel = o.menuModel;
		}		
		
		this.$super(o);
//		Ergo.widgets.MenuDropdownList.superclass.$init.apply(this, arguments);
				
//		if('defaultItem' in o)
//			Ergo.smart_override(o.defaultItem.components.submenu.defaultItem, o.defaultItem);//o.defaults.subItem, {defaults: {'subItem': o.defaults.subItem}});
		
	},
	
	hideAll: function() {
		this.close();
		if(this.parent instanceof Ergo.widgets.MenuItem) this.parent.hideSubmenu(true)
	}
	
	
//	defaults: {
//		html: '<table cellspacing="0" cellpadding="0" border="0"><tbody/></table>',
//		defaultItem: {
//			etype: 'box',
//			html: '<tr/>',
//			cls: 'menu-item',
//			defaultItem: {
//				etype: 'box',
//				html: '<td/>'
//			},
//			items: [{
//				width: 24
//			}, {
//				etype: 'text',							
//				width: 16
//			}, {
//			}]
//		}
//	}
	
	
	
}, 'menu-dropdown-list');














