



Dino.declare('Dino.containers.MenuItem', 'Dino.containers.Item', {
	
	defaultCls: 'dino-menu-item',
	
	defaultOptions: {
		defaultItem: {
			dtype: 'text'
		},
		model: {
		},
		menuItemFactory: function(o) {
			return new Dino.containers.MenuItem(o);
		}
	},
	
	_init: function(){
		Dino.containers.MenuItem.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if('submenu' in o){
			
			var subDropdown = Dino.merge_r({}, o.model.dropdown, o.submenuDropdown);
			
			this.submenu = new Dino.containers.DropDownBox(subDropdown);
			this.submenu.opt({cls: 'dino-submenu'});
			
			for(var i in o.submenu){
				var subItem = Dino.merge_r({model: o.model}, o.model.item, o.submenuItem, o.submenu[i]);
				var si = this.options.menuItemFactory(subItem);
				this.submenu.addItem( si );
//				si.parentMenu = this;
			}
			
			if(o.submenu.length > 0)
				this.el.addClass('has-submenu');
			
			this.addItem(this.submenu);
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
		content: {},
		menuItemFactory: function(o) {
			return new Dino.containers.TextMenuItem(o);
		}
	},
	
	
	_opt: function(o) {
		Dino.containers.TextMenuItem.superclass._opt.apply(this, arguments);
		
		if('label' in o) this.content.opt('text', o.label);
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




