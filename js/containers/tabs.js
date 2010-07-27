


/*
Dino.declare('Dino.containers.TabLayout', 'Dino.Layout', {
	
	insert: function(item) {
		var wrapper = $('<li/>');
		wrapper.append(item.el);
		this.container.el.append( wrapper );
	},
	
	remove: function(item) {
		item.el.parent().remove();
	},
	
	clear: function() {
		this.container.el.empty();
	}
	
});
*/



Dino.declare('Dino.containers.Tabs', 'Dino.containers.Box', {
	
	
	defaultOptions: {
		defaultItem: {
			events: {
				'click': function(){
					var tab = $(this).dino();
					tab.parent.changeTab(tab);
				}
			}
		},
		defaultTabItem: {
			dtype: 'text'
		},
		defaultIndex: 0
	},
	
	defaultCls: 'dino-tabs',
	
	_html: function() { return '<ul></ul>' },
	
	_opt: function(o) {
		Dino.containers.Tabs.superclass._opt.apply(this, arguments);
		
		if('tabs' in o){
			for(var i in o.tabs){
				// создаем закладку
				var tab = this.options.itemFactory.call(this, {
					wrapEl: $('<li/>'),
					defaultItem: this.options.defaultTabItem,
					content: o.tabs[i]					
				});
				
				tab.index = parseInt(i); //FIXME это хорошо работает пока закладки не начинают добавляться произвольно
				
/*				
				var tab = new _dino.Container('<li/>', {
					defaultItem: this.options.defaultTabItem,
					content: o.tabs[i]
				});
*/				
				this.addItem(tab);
			}
		}
				
	},
	
//	_afterBuild: function(){
//		Dino.containers.Tabs.superclass._afterBuild.apply(this, arguments);
//		
//		if('defaultIndex' in this.options)
//			this.changeTab(this.options.defaultIndex);
//	},
	
	changeTab: function(tab){
		
		// если указанный объект не является виджетом, то ищем его через getItem
		if(!(tab instanceof Dino.Widget)) tab = this.getItem(tab);
		
		tab.setState('active');
		this.eachItem(function(item){
			if(item != tab)
				item.clearState('active');
		});
		this.currentTab = tab;
		this.events.fire('onTabChanged');
		
	}

	
	
	
	
	
/*	
	addTab: function(o){
	
		var self = this;
		
		var tab = new Dino.Widget('<li>'+o.text+'</li>', Dino.override({}, this.options.tabModel));
		this.header.addItem(tab);
		
		tab.el.click(function(e){
			self.showTab(tab);
			self.header.eachItem(function(item){
				if(item != tab) self.hideTab(item);
			});
		});
		
		
		var c = this.options.itemFactory(o);
		this.content.addItem(c);
		
	}
*/	
	
	
}, 'tabs');




/*
Dino.declare('Dino.containers.Tabs', 'Dino.containers.Box', {
	
	_init: function() {
		Dino.containers.Tabs.superclass._init.apply(this, arguments);

		this.header = new Dino.Container('<ul class="dino-tab-header"/>');
		this.addItem(this.header);

		this.content = new Dino.Container('<div class="dino-tab-content"/>');
		this.addItem(this.content);
		
	},
	
	addTab: function(title, o) {
		
		var self = this;
		
		var tab = new Dino.Widget('<li>'+title+'</li>', Dino.override({}, this.options.tabModel));
		this.header.addItem(tab);
		
		tab.el.click(function(e){
			self.showTab(tab);
			self.header.eachItem(function(item){
				if(item != tab) self.hideTab(item);
			});
		});
		
		
		var c = this.options.itemFactory(o);
		this.content.addItem(c);
	},
	
	showTab: function(tab){
//		var tab = this.children[i];
		tab.el.removeClass(this.options.tabModel.clsOff).addClass(this.options.tabModel.clsOn);
	},
	
	hideTab: function(tab){
		tab.el.removeClass(this.options.tabModel.clsOn).addClass(this.options.tabModel.clsOff);
	}
	
	
	
}, 'tabs');
*/



