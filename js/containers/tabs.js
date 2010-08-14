



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
		itemFactory: function(o){
			return Dino.widget({
				wrapEl: $('<li/>'),
				defaultItem: this.options.tabContent
			}, o);
		},
		tabContent: {
			dtype: 'text'
		},
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
	
	changeTab: function(tab){
		
		// если указанный объект не является виджетом, то ищем его через getItem
		if(!(tab instanceof Dino.Widget)) tab = this.getItem(tab);
		
		tab.states.set('active');
		this.eachItem(function(item){
			if(item != tab)
				item.states.clear('active');
		});
		this.currentTab = tab;
		this.events.fire('onTabChanged');
		
	}

		
	
}, 'tabs');








Dino.declare('Dino.containers.TabPanel', 'Dino.Widget', {
	
	defaultOptions: {
		tabContainer: {
			dtype: 'tabs',
			onTabChanged: function(){
				// переключаем страницу при смене закладки
				this.parent.pages.layout.activate( this.currentTab.index );
			}
		},
		pageContainer: {
			dtype: 'box',
			layout: 'stack-layout'
		}
	},
	
	
	_init: function() {
		Dino.containers.TabPanel.superclass._init.apply(this, arguments);
				
		var o = this.options;
		
		this.tabs = new Dino.widget( o.tabContainer );
		this.children.add(this.tabs);
		this.tabs._render(this.el);

		this.pages = new Dino.widget( o.pageContainer );
		this.children.add(this.pages);
		this.pages._render(this.el);
		
		
		
/*		
		this.tabs = this.children.add(o.tabs);
		this.layout.insert(this.tabs);
		this.pages = this.children.add(o.pages);
		this.layout.insert(this.pages);
*/		
	},
	
	_opt: function(o) {
		Dino.containers.TabPanel.superclass._opt.apply(this, arguments);
		
		if('pages' in o){
			for(var i = 0; i < o.pages.length; i++) this.addPage(o.pages[i]);
		}
	},
	
	addPage: function(item) {
		this.tabs.addItem( item.tab || {} );// Dino.utils.overrideOpts({}, this.options.tabItem, item.tab) );
		this.pages.addItem( item );// Dino.utils.overrideOpts({}, this.options.pageItem, item));
	}
	
	
}, 'tab-panel');








