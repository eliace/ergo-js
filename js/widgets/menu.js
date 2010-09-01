


Dino.declare('Dino.widgets.MenuItem', 'Dino.Widget', {
	
	defaultOptions: {
		showOnEnter: true,
		hideOnLeave: true,
		components: {
//			// содержимое эелемента меню (текст, виджет и др.)
			content: {
				weight: 1
//				dtype: 'text-item'
			},
			// выпадающее подменю
			submenu: {
				dtype: 'dropdown-box',
				defaultItem: {
					dtype: 'menu-item',
					isSubitem: true
				}
			}
		}
	},
	
	_init: function() {
		Dino.widgets.MenuItem.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if('submenu' in o){
			o.components.submenu.items = o.submenu;
			this.states.set('has-submenu');
		}

		if('submenuWidth' in o){
			o.components.submenu.width = o.submenuWidth;
		}
		
		if('defaultSubItem' in o){
			Dino.utils.overrideOpts(o.components.submenu.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
		
	},
	
	_events: function(self) {
		Dino.widgets.MenuItem.superclass._events.apply(this, arguments);
		
		this.el.bind('mouseenter', function(){
			self.hoverSubmenu = true;
			if(self.options.showOnEnter){
				self.showSubmenu();
			}
		});
		
		this.el.bind('mouseleave', function(){
			self.hoverSubmenu = false;
			if(self.options.hideOnLeave){
				if(self.submenu){
					self.submenu.hide();
					self.events.fire('onSubmenuHide');
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
		if(hideAll && this.options.isSubitem)
			this.parent.parent.hideSubmenu(true);
	}
	
	
	
}, 'menu-item');





Dino.declare('Dino.widgets.TextMenuItem', 'Dino.widgets.MenuItem', {
	
	defaultOptions: {
		components: {
			content: {
				dtype: 'text-item'
			},
			submenu: {
				defaultItem: {
					dtype: 'text-menu-item'
				}
			}
		}
	},
	
	_opt: function(o) {
		Dino.widgets.TextMenuItem.superclass._opt.call(this, o);
		
		if('label' in o) this.content.opt('label', o.label);
		
	}
	
	
}, 'text-menu-item');





/*
Dino.declare('Dino.containers.MenuItem', 'Dino.containers.Box', {
	
	defaultCls: 'dino-menu-item',
	
	defaultOptions: {
		showOnEnter: true,
		hideOnLeave: true,
		defaultItem: {
			dtype: 'text'
		},
		// общие параметры для всех подэлементов меню на всех уровнях вложенности
		submenuModel: {
			dropdown: {},
			item: {}
		},
		submenuItemFactory: function(o) {
			var opts = this.options;
			return Dino.widget(
					Dino.utils.overrideOpts(
						{dtype: 'menu-item', submenuModel: opts.submenuModel}, 	// передаем глобальные параметры 
						opts.submenuModel.item, 			// гпараметры модели
						opts.submenuItem,					// параметры текущего подменю
						o
					));
		},
		submenuDropdownFactory: function(o) {
			return new Dino.containers.DropDownBox( 
					Dino.utils.overrideOpts(
						{}, 
						this.options.submenuModel.dropdown, 
						this.options.submenuDropdown, 
						o
					));
		}
	},
	
	_init: function(){
		Dino.containers.MenuItem.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		// создаем подменю
		if('submenu' in o){
			
			this.submenu = this.options.submenuDropdownFactory.call(this, o.submenuDropdown);
			
			for(var i in o.submenu){
				var submenuItem = this.options.submenuItemFactory.call(this, o.submenu[i]);
				this.submenu.addItem( submenuItem );
				submenuItem.parentMenuItem = this; 
			}
			
			if(o.submenu.length > 0)
				this.el.addClass('has-submenu');
			
			this.el.append(this.submenu.el);
			this.children.add(this.submenu);
			
//			this.addItem(this.submenu);
		}
		
	},
	
	_events: function(self){
		Dino.containers.MenuItem.superclass._events.apply(this, arguments);
		
		this.el.bind('mouseenter', function(){
			self.hoverSubmenu = true;
			if(self.options.showOnEnter){
				self.showSubmenu();
			}
		});
		
		this.el.bind('mouseleave', function(){
			self.hoverSubmenu = false;
			if(self.options.hideOnLeave){
				if(self.submenu){
					self.submenu.hide();
					self.events.fire('onSubmenuHide');
				}
			}
		});
		
	},
	
	showSubmenu: function(){
		if(this.submenu) this.submenu.show( $(this.el).width(), 0);		
	},
	
	hideSubmenu: function(hideAll){
		if(this.submenu){
			this.submenu.hide();
			this.events.fire('onSubmenuHide');			
		}		
		if(hideAll && this.parentMenuItem)
			this.parentMenuItem.hideSubmenu(true);
	}
	
	
	
}, 'menu-item');





Dino.declare('Dino.containers.TextMenuItem', 'Dino.containers.MenuItem', {

	defaultOptions: {
		layout: '3c-layout',
		content: {
			dtype: 'box'
		},
		submenuItemFactory: function(o) {
			return Dino.widget(
					Dino.utils.overrideOpts(
						{dtype: 'text-menu-item', submenuModel: this.options.submenuModel}, 	// передаем глобальные параметры 
						this.options.submenuModel.item, 			// параметры модели
						this.options.submenuItem,					// параметры текущего подменю
						o
					));
		}
	},
	
	
	_opt: function(o) {
		Dino.containers.TextMenuItem.superclass._opt.apply(this, arguments);
		
		if('label' in o) this.layout.center.opt('text', o.label);
	},
	
	_events: function(self) {
		Dino.containers.TextMenuItem.superclass._events.apply(this, arguments);
		
		this.el.click(function(e){
			self.events.fire('onAction');
			e.stopPropagation(); // для предотвращения срабатывания onAction в родительских элементах меню
		});
	}


	
}, 'text-menu-item');






Dino.declare('Dino.containers.Menu', 'Dino.containers.Box', {
	
	
	
	
	
	
	
}, 'menu');
*/



