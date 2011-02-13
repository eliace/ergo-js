
/**
 * @class
 * @name Dino.panels.TabPanel
 * @extends Dino.Widget
 */
Dino.declare('Dino.panels.TabPanel', 'Dino.Widget', /** @lends Dino.panels.TabPanel.prototype */{
	
	_html: function() { return '<div></div>'; },	
	
	defaultOptions: {
		cls: 'dino-tab-panel',
		tabPosition: 'top',
		components: {
			tabs: {
				weight: 1,
				dtype: 'tabs',
				defaultItem: {
					cls: 'dino-bg-3 dino-border-all dino-corner-top',
					content: {
						dtype: 'text-item'
//						selectable: false
					}
				},
				onTabChanged: function(){
					// переключаем страницу при смене закладки
					this.parent.pages.layout.activate( this.currentTab.index );
					this.parent.events.fire('onTabChanged', {'tab': this.parent.getCurrentTab(), 'page': this.parent.getCurrentPage()});
				}
			},
			pages: {
				weight: 2,
				dtype: 'box',
				layout: 'stack-layout',
				cls: 'dino-tab-pages dino-border-all',
				defaultItem: {
					dtype: 'box'
				}
			}
		}
	},
	
	
	_init: function() {
		Dino.panels.TabPanel.superclass._init.apply(this, arguments);
				
		var o = this.options;

		if('tabWidth' in o) {
			if(o.tabPosition == 'left' || o.tabPosition == 'right'){
				var s = {};
				s['margin-'+o.tabPosition] = o.tabWidth+1;
				Dino.utils.overrideOpts(this.options, {
					components: {
						tabs: {defaultItem: {width: o.tabWidth}},
						pages: {style: s}
					}
				});
			}			
		}

		if('tabPosition' in o){
			if(o.tabPosition == 'bottom'){
				Dino.utils.overrideOpts(this.options, {
					components: {
						tabs: {weight: 2},
						pages: {weight: 1}
					}
				});
			}
		}
		
		
		if('tab' in o.defaults)
			Dino.utils.overrideOpts(o.components.tabs.defaultItem, o.defaults.tab);
		
		if('page' in o.defaults)
			Dino.utils.overrideOpts(o.components.pages.defaultItem, o.defaults.page);
		
	},
	
	
	_afterRender: function() {
		this.base('_afterRender', arguments);
		
		// активируем закладку
		if(!this.tabs.currentTab) this.tabs.setActiveTab(0);
	},
	
	
	_opt: function(o) {
		Dino.panels.TabPanel.superclass._opt.apply(this, arguments);
		
		if('pages' in o){
			for(var i = 0; i < o.pages.length; i++) this.addPage(o.pages[i]);
		}
		
		if('tabPosition' in o){
			this.tabs.opt('cls', o.tabPosition);
			this.pages.opt('cls', o.tabPosition);
		}
		
	},
	
	addPage: function(item) {
		var tabOpts = (item instanceof Dino.Widget) ? item.options.tab : item.tab;
		var tab = this.tabs.addItem( {content: tabOpts || {}} );
		var page = this.pages.addItem( item );
		page.tab = tab;
	},
	
	removePage: function(i) {
		//TODO
	},
	
	setCurrentTab: function(i) {
		this.tabs.activateTab(i);
	},
	
	getCurrentTab: function() {
		return this.tabs.currentTab;
	},
	
	getCurrentPage: function() {
		return this.pages.getItem(this.tabs.currentTab.index);
	},
	
	setCurrentPage: function(i) {
		this.tabs.setActiveTab( this.pages.getItem(i).tab );
	}
	
		
	
//	getPage: function(i) {
//		return this.pages.getItem(i);
//	}
	
	
}, 'tab-panel');

