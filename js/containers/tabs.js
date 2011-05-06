


/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.containers.Tabs = Dino.declare('Dino.containers.Tabs', 'Dino.containers.Box', /** @lends Dino.containers.Tabs.prototype */{
	
	
	defaultOptions: {
		defaultItem: {
			html: '<li/>',
			cls: 'dino-tabs-item',
			content: {
				dtype: 'text'
			},
//			state: 'clickable',
//			onClick: function() {
//				this.parent.setActiveTab(this);
//			}
			events: {
				'click': function(e, w){
					w.parent.setActiveTab(w);
				}
			}
		},
//		itemFactory: function(o){
//			return Dino.widget({
//				wrapEl: $('<li/>')
////				defaultItem: this.options.tabContent
//			}, o);
//		},
//		tabContent: {
//			dtype: 'text'
//		},
		defaultIndex: 0
	},
	
	defaultCls: 'dino-tabs',
	
	$html: function() { return '<ul></ul>' },
	
	
	setActiveTab: function(tab){
		
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
		
	},
	
	getActiveTab: function(){
		return this.currentTab;
	}

		
	
}, 'tabs');




