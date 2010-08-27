

Dino.declare('Dino.panels.TabPanel', 'Dino.Widget', {
	
	defaultOptions: {
		cls: 'dino-tab-panel',
		tabPosition: 'top',
		components: {
			tabs: {
				weight: 1,
				dtype: 'tabs',
				defaultItem: {
					cls: 'dino-bg-3'
				},
				onTabChanged: function(){
					// переключаем страницу при смене закладки
					this.parent.pages.layout.activate( this.currentTab.index );
				}
			},
			pages: {
				weight: 2,
				dtype: 'box',
				layout: 'stack-layout'
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
		
		
	},
	
	
	_afterBuild: function(){
		this.tabs.activateTab(0);
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
		this.tabs.addItem( tabOpts || {} );// Dino.utils.overrideOpts({}, this.options.tabItem, item.tab) );
		this.pages.addItem( item );// Dino.utils.overrideOpts({}, this.options.pageItem, item));
	}
	
	
}, 'tab-panel');

