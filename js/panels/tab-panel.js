

Dino.declare('Dino.panels.TabPanel', 'Dino.Widget', {
	
	defaultOptions: {
		components: {
			tabs: {
				dtype: 'tabs',
				onTabChanged: function(){
					// переключаем страницу при смене закладки
					this.parent.pages.layout.activate( this.currentTab.index );
				}
			},
			pages: {
				dtype: 'box',
				layout: 'stack-layout'
			}
		}
	},
	
	
	_init: function() {
		Dino.panels.TabPanel.superclass._init.apply(this, arguments);
				
		var o = this.options;
		
//		this.addComponent('tabs', o.tabContainer);
//		this.addComponent('pages', o.pageContainer);
		
//		this.tabs = new Dino.widget( o.tabContainer );
//		this.children.add(this.tabs);
//		this.tabs._render(this.el);
//
//		this.pages = new Dino.widget( o.pageContainer );
//		this.children.add(this.pages);
//		this.pages._render(this.el);
				
	},
	
	
	_afterBuild: function(){
		this.tabs.activateTab(0);
	},
	
	_opt: function(o) {
		Dino.panels.TabPanel.superclass._opt.apply(this, arguments);
		
		if('pages' in o){
			for(var i = 0; i < o.pages.length; i++) this.addPage(o.pages[i]);
		}
	},
	
	addPage: function(item) {
		var tabOpts = (item instanceof Dino.Widget) ? item.options.tab : item.tab;
		this.tabs.addItem( tabOpts || {} );// Dino.utils.overrideOpts({}, this.options.tabItem, item.tab) );
		this.pages.addItem( item );// Dino.utils.overrideOpts({}, this.options.pageItem, item));
	}
	
	
}, 'tab-panel');



