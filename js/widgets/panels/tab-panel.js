
//= require <containers/tabs>
//= require <widgets/text-item>
//= require <layouts/stack>

/**
 * @class
 * @name Ergo.panels.TabPanel
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.panels.TabPanel', 'Ergo.core.Widget', /** @lends Ergo.panels.TabPanel.prototype */{
	
	$html: function() { return '<div></div>'; },
	
	defaultCls: 'dino-tab-panel',
	
	defaults: {
		tabPosition: 'top',
		components: {
			tabs: {
				weight: 1,
				etype: 'tabs',
				defaultItem: {
					cls: 'dino-bg-3 dino-border-all',// dino-corner-top',
					content: {
						etype: 'text-item'
//						selectable: false
					}
				},
				onTabChanged: function(){
					// переключаем страницу при смене закладки
					this.parent.pages.setActive( this.currentTab.index );
					this.parent.events.fire('onTabChanged', {'tab': this.parent.getCurrentTab(), 'page': this.parent.getCurrentPage()});
				}
			},
			tabFooter: {
				weight: 2,
				etype: 'box',
				cls: 'dino-tab-footer'// dino-border-top dino-border-bottom'// dino-border-no-bottom'
			},
			pages: {
				weight: 3,
				etype: 'list',
				layout: 'stack',
				cls: 'dino-tab-pages',
				defaultItem: {
					
				}
			}
		},
		panelModel: {
			
		}
	},
	
	
	$init: function() {
		Ergo.panels.TabPanel.superclass.$init.apply(this, arguments);
				
		var o = this.options;

		if('tabWidth' in o) {
			if(o.tabPosition == 'left' || o.tabPosition == 'right'){
				var s = {};
				s['margin-'+o.tabPosition] = o.tabWidth+1;
				Ergo.smart_override(this.options, {
					components: {
						tabs: {defaultItem: {width: o.tabWidth}},
						pages: {style: s}
					}
				});
			}			
		}

		if('tabPosition' in o){
			if(o.tabPosition == 'bottom'){
				Ergo.smart_override(this.options, {
					components: {
						tabs: {weight: 3},
						tabFooter: {weight: 2},
						pages: {weight: 1}
					}
				});
			}
		}
		
		
		if('tab' in o.panelModel)
			Ergo.smart_override(o.components.tabs.defaultItem, o.panelModel.tab);
		
		if('page' in o.panelModel)
			Ergo.smart_override(o.components.pages.defaultItem, o.panelModel.page);
		
	},
	
	
	$afterBuild: function() {
		Ergo.panels.TabPanel.superclass.$afterBuild.apply(this, arguments);
		
		// активируем закладку
		if(!this.tabs.currentTab) this.tabs.setActiveTab(0);
	},
	
	
	$opt: function(o) {
		Ergo.panels.TabPanel.superclass.$opt.apply(this, arguments);
		
		if('pages' in o){
			for(var i = 0; i < o.pages.length; i++) this.addPage(o.pages[i]);
		}
		
		if('tabPosition' in o){
			this.tabs.opt('cls', o.tabPosition);
			this.pages.opt('cls', o.tabPosition);
		}
		
	},
	
	addPage: function(item) {
		
		var tabOpts = (item instanceof Ergo.core.Widget) ? item.options.tab : item.tab;
		if($.isString(tabOpts)) tabOpts = {text: tabOpts};
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
		this.tabs.setActiveTab( this.pages.item(i).tab );
	}
	
		
	
//	getPage: function(i) {
//		return this.pages.getItem(i);
//	}
	
	
}, 'tab-panel');

