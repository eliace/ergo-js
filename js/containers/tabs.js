



Dino.declare('Dino.containers.Tabs', 'Dino.containers.Box', {
	
	
	defaultOptions: {
		defaultItem: {
			content: {
				dtype: 'text'
			},
			events: {
				'click': function(){
					var tab = $(this).dino();
					tab.parent.activateTab(tab);
				}
			}
		},
		itemFactory: function(o){
			return Dino.widget({
				wrapEl: $('<li/>')
//				defaultItem: this.options.tabContent
			}, o);
		},
//		tabContent: {
//			dtype: 'text'
//		},
		defaultIndex: 0
	},
	
	defaultCls: 'dino-tabs',
	
	_html: function() { return '<ul></ul>' },
	
	_opt: function(o) {
		Dino.containers.Tabs.superclass._opt.apply(this, arguments);
		
/*		
		if('tabs' in o){
			for(var i in o.tabs) this.addTab( o.tabs[i] );
		}
*/		
//		if('dock' in o){
//			this.el.addClass('dock-'+o.dock);
//		}
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

	},
	
//	_afterBuild: function(){
//		Dino.containers.Tabs.superclass._afterBuild.apply(this, arguments);
//		
//		if('defaultIndex' in this.options)
//			this.changeTab(this.options.defaultIndex);
//	},
	
/*	
	addTab: function(t) {
		// создаем закладку
		var tab = this.options.itemFactory.call(this, {
			wrapEl: $('<li/>'),
			defaultItem: this.options.defaultTabItem,
			content: t
		});
				
		this.addItem(tab);
		
		tab.index = parseInt(this.children.length-1); //FIXME это хорошо работает пока закладки не начинают добавляться произвольно		
	},
*/	
	
	activateTab: function(tab){
		
		// если указанный объект не является виджетом, то ищем его через getItem
		if(!(tab instanceof Dino.Widget)) tab = this.getItem(tab);
		
		tab.states.set('active');
		this.eachItem(function(item){
			if(item != tab)
				item.states.clear('active');
		});
		var is_changed = (this.currentTab != tab);
		this.currentTab = tab;
		if(is_changed) this.events.fire('onTabChanged');
		
	}

		
	
}, 'tabs');




