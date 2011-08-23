
//= require "list"
//= require <widgets/natives/all>


/**
 * @class
 * @extends Ergo.containers.List
 */
Ergo.containers.Tabs = Ergo.declare('Ergo.containers.Tabs', 'Ergo.containers.List', /** @lends Ergo.containers.Tabs.prototype */{
	
	
	defaults: {
		defaultItem: {
			html: '<li/>',
			cls: 'dino-tabs-item',
			content: {
				etype: 'text'
			},
//			state: 'clickable',
			onClick: function() {
				this.parent.setActiveTab(this);
			}
//			events: {
//				'click': function(e, w){
//					w.parent.setActiveTab(w);
//				}
//			}
		},
//		itemFactory: function(o){
//			return Ergo.widget({
//				wrapEl: $('<li/>')
////				defaultItem: this.options.tabContent
//			}, o);
//		},
//		tabContent: {
//			etype: 'text'
//		},
		defaultIndex: 0
	},
	
	defaultCls: 'dino-tabs',
	
	$html: function() { return '<ul></ul>' },
	
	
	setActiveTab: function(tab){
		
		// если указанный объект не является виджетом, то ищем его через getItem
		if(!(tab instanceof Ergo.core.Widget)) tab = this.item(tab);
		
		tab.states.set('active');
		this.items.each(function(item){
			if(item != tab)
				item.states.clear('active');
		});
		var is_changed = (this.currentTab != tab);
		this.currentTab = tab;
		if(is_changed) this.events.fire('onTabChanged');
		
	},
	
	getActiveTab: function(){
		return this.currentTab;
	}

		
	
}, 'tabs');




