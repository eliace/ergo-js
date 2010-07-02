



Dino.declare('Dino.containers.MenuItem', 'Dino.Container', {
	
	_html: function() { return '<div/>'; },
	
	defaultCls: 'dino-menu-item',
	
	_init: function(){
		Dino.containers.MenuItem.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if('submenu' in o){
			
			var subMenu = Dino.merge_r({
				dtype: 'dropdown-box',
				cls: 'dino-submenu'
			}, o.menuContext, o.submenuOpts);
			
			this.submenu = Dino.widget(subMenu);
			
			for(var i in o.submenu){
				var subItem = Dino.merge_r({menuContext: o.menuContext}, o.submenu[i]);
				this.submenu.addItem( new Dino.containers.MenuItem(subItem) );
			}
			
			this.addItem(this.submenu);
		}
		
	},
	
	_events: function(self){
		Dino.containers.MenuItem.superclass._events.apply(this, arguments);
		
		this.el.bind('mouseenter', function(){
			var pos = $(this).position();
			if(self.submenu) self.submenu.show(pos.left + $(this).width(), pos.top);
		});
		
		this.el.bind('mouseleave', function(){
			if(self.submenu) self.submenu.hide();
		});
		
	}
	
	
	
}, 'menu-item');
