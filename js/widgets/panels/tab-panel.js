
//= require <containers/tabs>
//= require <widgets/text-item>
//= require <layouts/stack>

/**
 * @class
 * @name Dino.panels.TabPanel
 * @extends Dino.core.Widget
 */
Dino.declare('Dino.panels.TabPanel', 'Dino.core.Widget', /** @lends Dino.panels.TabPanel.prototype */{
	
	$html: function() { return '<div></div>'; },
	
	defaultCls: 'dino-tab-panel',
	
	defaults: {
		tabPosition: 'top',
		components: {
			tabs: {
				weight: 1,
				dtype: 'tabs',
				defaultItem: {
					cls: 'dino-bg-3 dino-border-all',// dino-corner-top',
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
			tabFooter: {
				weight: 2,
				dtype: 'box',
				cls: 'dino-tab-footer'// dino-border-top dino-border-bottom'// dino-border-no-bottom'
			},
			pages: {
				weight: 3,
				dtype: 'list',
				layout: 'stack',
				cls: 'dino-tab-pages',
				defaultItem: {
					
				}
			}
		}
	},
	
	
	$init: function() {
		Dino.panels.TabPanel.superclass.$init.apply(this, arguments);
				
		var o = this.options;

		if('tabWidth' in o) {
			if(o.tabPosition == 'left' || o.tabPosition == 'right'){
				var s = {};
				s['margin-'+o.tabPosition] = o.tabWidth+1;
				Dino.smart_override(this.options, {
					components: {
						tabs: {defaultItem: {width: o.tabWidth}},
						pages: {style: s}
					}
				});
			}			
		}

		if('tabPosition' in o){
			if(o.tabPosition == 'bottom'){
				Dino.smart_override(this.options, {
					components: {
						tabs: {weight: 3},
						tabFooter: {weight: 2},
						pages: {weight: 1}
					}
				});
			}
		}
		
		
		if('tab' in o.defaults)
			Dino.smart_override(o.components.tabs.defaultItem, o.defaults.tab);
		
		if('page' in o.defaults)
			Dino.smart_override(o.components.pages.defaultItem, o.defaults.page);
		
	},
	
	
	$afterBuild: function() {
		Dino.panels.TabPanel.superclass.$afterBuild.apply(this, arguments);
		
		// активируем закладку
		if(!this.tabs.currentTab) this.tabs.setActiveTab(0);
	},
	
	
	$opt: function(o) {
		Dino.panels.TabPanel.superclass.$opt.apply(this, arguments);
		
		if('pages' in o){
			for(var i = 0; i < o.pages.length; i++) this.addPage(o.pages[i]);
		}
		
		if('tabPosition' in o){
			this.tabs.opt('cls', o.tabPosition);
			this.pages.opt('cls', o.tabPosition);
		}
		
	},
	
	addPage: function(item) {
		
		var tabOpts = (item instanceof Dino.core.Widget) ? item.options.tab : item.tab;
		if(Dino.isString(tabOpts)) tabOpts = {text: tabOpts};
		var tab = this.tabs.items.add( {content: tabOpts || {}} );
		
		var page = this.pages.items.add( item );
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
		return this.pages.items.get(this.tabs.currentTab.index);
	},
	
	setCurrentPage: function(i) {
		this.tabs.setActiveTab( this.pages.items.find(i).tab );
	}
	
		
	
//	getPage: function(i) {
//		return this.pages.getItem(i);
//	}
	
	
}, 'tab-panel');

