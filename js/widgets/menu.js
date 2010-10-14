


Dino.declare('Dino.widgets.MenuItem', 'Dino.Widget', {
	
	defaultOptions: {
		showOnEnter: true,
		hideOnLeave: true,
		components: {
//			// содержимое эелемента меню (текст, виджет и др.)
			content: {
				weight: 1,
				dtype: 'text'
//				dtype: 'text-item'
			},
			// выпадающее подменю
			submenu: {
				dtype: 'dropdown-box',
				defaultItem: {
					dtype: 'menu-item',
					isSubitem: true
				},
				offset: [-1, 1]
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
		if(hideAll && this.options.isSubitem)
			this.parent.parent.hideSubmenu(true);
	}
	
	
	
}, 'menu-item');





Dino.declare('Dino.widgets.TextMenuItem', 'Dino.widgets.MenuItem', {
	
	defaultOptions: {
		baseCls: 'dino-menu-item',
		components: {
			content: {
				dtype: 'text-item',
				onAction: function() {
					this.parent.events.fire('onAction');
				},
				rightIconCls: 'dino-submenu-icon'
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
		
	},
	
	getText: function() {
		return this.content.getText();
	}
	
	
}, 'text-menu-item');






Dino.declare('Dino.widgets.ContextMenu', 'Dino.containers.DropDownBox', {
	
	defaultOptions: {
		hideOn: 'hoverOut',
		baseCls: 'dino-context-menu',
		renderTo: 'body',
		defaultItem: {
			dtype: 'text-menu-item',
			onAction: function(e) {
				this.parent.events.fire('onAction', {actor: this});
				this.parent.hide();
			}			
		},
		offset: [-2, -2]
	},
	
	_events: function(self){
		Dino.widgets.ContextMenu.superclass._events.call(this, self);
		
		this.el.bind('mouseleave', function(){ 
			if(self.options.hideOn == 'hoverOut') self.hide(); 
		});
	},
	
	
//	_opt: function(o) {
//		Dino.widgets.ContextMenu.superclass._opt.apply(this, arguments);
//		
//	},
	
//	_afterRender: function() {
//		Dino.widgets.ContextMenu.superclass._afterRender.apply(this, arguments);
//		
//		var self = this;
//		
//		if('attachTo' in this.options){
//			var el = this.options.attachTo;
//			if(el instanceof Dino.Widget) el = el.el;
//			$(el).bind('mousedown', function(e){
//				if(e.button != 2) return;
//				
//				self.show(e.pageX, e.pageY);
//				
////				e.stopPropagation();
//				
////		        $('body').one('click', function(){ self.hide(); });		
//			});
//			
//			$(el).bind('contextmenu', function(){
//				return false;
//			});
//			
//		}
//		
//	}
	
	show: function(x, y, eff) {
		Dino.widgets.ContextMenu.superclass.show.apply(this, arguments);
		
		var self = this;
		
		if(this.options.hideOn == 'outerClick')
			$('body').one('click', function(){ self.hide(); });
		
//		switch(this.options.hide){
//			case 'outerClick':
//				$('body').one('click', function(){ self.hide(); });
//				break;
//			case 'hoverOut':
//				this.el.one('mouseleave', function(){ self.hide(); });				
//				break;
//		}
	}
	
	
	
}, 'context-menu');




