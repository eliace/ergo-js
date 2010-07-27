



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
			return Dino.widget(
					this.opt_override(
						{dtype: 'menu-item', submenuModel: this.options.submenuModel}, 	// передаем глобальные параметры 
						this.options.submenuModel.item, 			// гпараметры модели
						this.options.submenuItem,					// параметры текущего подменю
						o
					));
		},
		submenuDropdownFactory: function(o) {
			return new Dino.containers.DropDownBox( 
					this.opt_override(
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
			this.addChild(this.submenu);
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
		if(this.submenu) this.submenu.show(/*pos.left +*/ $(this.el).width(), 0/*pos.top*/);		
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
		content: {},
		submenuItemFactory: function(o) {
			return Dino.widget(
					this.opt_override(
						{dtype: 'text-menu-item', submenuModel: this.options.submenuModel}, 	// передаем глобальные параметры 
						this.options.submenuModel.item, 			// гпараметры модели
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




