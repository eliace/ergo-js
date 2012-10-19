
//= require <widgets/panel>

Ergo.declare('Ergo.widgets.TabPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		
		cls: 'e-tabs-holder',
		
		mixins: ['selectable'],
		
		onSelect: function(e) {
			
			this.setActiveTab(e.target._index);
			// this.selection.set(e.target);
			// this.content.setActive(e.target._index);
			e.stop();
			
		},
		
		components: {
			tabs: {
				cls: 'e-tabs-navigation',
				weight: -5,
				components: {
					content: {
						etype: 'list',
						defaultItem: {
							onClick: function() {
								this.events.bubble('select');
							}
						}
					}
				}
			},
			content: {
				layout: 'stack',
				cls: 'e-tabs-content',
				defaultItem: {
					autoHeight: 'ignore-siblings'
				}
			}
		},
		
		tabItems: []
		
	},
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		var tabs = [];
		for(var i = 0; i < o.tabItems.length; i++) {
			var item = o.tabItems[i];
			if('tab' in item) {
				if($.isPlainObject(item.tab)) tabs.push(item.tab);
				else tabs.push({text: item.tab});
			}
			else {
				tabs.push({text: 'tab'});
			}
		}
		
		Ergo.smart_override(o.components.content, {items: o.tabItems});
		Ergo.smart_override(o.components.tabs.components.content, {items: tabs});
		
	},
	
	setActiveTab: function(key) {
		var tab = this.tabs.content.item(key);
		if(tab) {
			this.selection.set(tab);
			this.content.setActive(tab._index);
			
			this.events.bubble('tabSelected', {target: this.content.item(tab._index)});			
		}
	},
	
	
	getTabItem: function(i) {
		return this.content.item(i);
	}
	
	
	
}, 'tab-panel');
