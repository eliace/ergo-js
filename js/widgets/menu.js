



Dino.declare('Dino.containers.MenuItem', 'Dino.containers.Box', {
	
	defaultCls: 'dino-menu-item',
	
	defaultOptions: {
		defaultItem: {
			dtype: 'text'
		},
		// общие параметры для всех подэлементов меню на всех уровнях вложенности
		submenuModel: {
			dropdown: {},
			item: {}
		},
		submenuItemFactory: function(o) {
			return new Dino.containers.MenuItem(
					Dino.widgets.utils.override_opts(
						{submenuModel: this.submenuModel}, 	// передаем глобальные параметры 
						this.submenuModel.item, 			// гпараметры модели
						this.submenuItem,					// параметры текущего подменю
						o
					));
		},
		submenuDropdownFactory: function(o) {
			return new Dino.containers.DropDownBox( 
					Dino.widgets.utils.override_opts(
						{}, 
						this.submenuModel.dropdown, 
						this.submenuDropdown, 
						o
					));
		}
	},
	
	_init: function(){
		Dino.containers.MenuItem.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		// создаем подменю
		if('submenu' in o){
			
			this.submenu = this.options.submenuDropdownFactory(o.submenuDropdown);
			
			for(var i in o.submenu){
				var submenuItem = this.options.submenuItemFactory(o.submenu[i]);
				this.submenu.addItem( submenuItem );
			}
			
			if(o.submenu.length > 0)
				this.el.addClass('has-submenu');
			
			this.el.append(this.submenu.el);
//			this.addItem(this.submenu);
		}
		
	},
	
	_events: function(self){
		Dino.containers.MenuItem.superclass._events.apply(this, arguments);
		
		this.el.bind('mouseenter', function(){
			var pos = $(this).position();
			if(self.submenu) self.submenu.show(/*pos.left +*/ $(this).width(), 0/*pos.top*/);
		});
		
		this.el.bind('mouseleave', function(){
			if(self.submenu){
				self.submenu.hide();
				self.fireEvent('onSubMenuHide');
			}
		});
		
	}
	
	
	
}, 'menu-item');





Dino.declare('Dino.containers.TextMenuItem', 'Dino.containers.MenuItem', {

	defaultOptions: {
		layout: '3c-layout',
		content: {},
		submenuItemFactory: function(o) {
			return new Dino.containers.TextMenuItem(
					Dino.widgets.utils.override_opts(
						{submenuModel: this.submenuModel}, 	// передаем глобальные параметры 
						this.submenuModel.item, 			// гпараметры модели
						this.submenuItem,					// параметры текущего подменю
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
		
		this.el.click(function(){
			self.fireEvent('onAction');
		});
	}


	
}, 'text-menu-item');






Dino.declare('Dino.containers.Menu', 'Dino.containers.Box', {
	
	
	
	
	
	
	
}, 'menu');




