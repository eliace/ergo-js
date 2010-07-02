


/*
Dino.declare('Dino.widgets.Tab', 'Dino.Widget', {
	
	_html: function() { return '<il/>'; },
	
	_opt: function(o){
		Dino.widgets.Tab.superclass._opt.call(this, o);
		
		if('text' in o) this.el.text();
	}


	
}, 'tab');
*/


Dino.declare('Dino.containers.Tabs', 'Dino.containers.Box', {
	
	
	defaultOptions: {
		itemFactory: function(o) {
			var opts = Dino.merge({}, o, this.defaultItem, {
				events: {
					'click': function(){
						tab.parent.changeTab(tab);
					}
				}
			});
			var tab = new Dino.Widget('<li/>', opts);
			return tab;
		}
	},
	
	defaultCls: 'dino-tabs',
	
	_html: function() { return '<ul></ul>' },
	
	changeTab: function(tab){
		
		if(Dino.isNumber(tab)) tab = this.getItem(tab);
		
		tab.resetState();
		tab.setState('active');
		this.eachItem(function(item){
			if(item != tab){
				item.resetState();
				item.setState('inactive');
			}
		});
		this.currentTab = tab;
		this.fireEvent('onTabChanged', new Dino.events.Event());
		
	}

	
	
	
	
	
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
	
	
}, 'tabs');




/*
Dino.declare('Dino.containers.Tabs', 'Dino.containers.Box', {
	
	_init: function() {
		Dino.containers.Tabs.superclass._init.apply(this, arguments);

		this.header = new Dino.Container('<ul class="dino-tab-header"/>');
		this.addItem(this.header);

		this.content = new Dino.Container('<div class="dino-tab-content"/>');
		this.addItem(this.content);
		
	},
	
	addTab: function(title, o) {
		
		var self = this;
		
		var tab = new Dino.Widget('<li>'+title+'</li>', Dino.override({}, this.options.tabModel));
		this.header.addItem(tab);
		
		tab.el.click(function(e){
			self.showTab(tab);
			self.header.eachItem(function(item){
				if(item != tab) self.hideTab(item);
			});
		});
		
		
		var c = this.options.itemFactory(o);
		this.content.addItem(c);
	},
	
	showTab: function(tab){
//		var tab = this.children[i];
		tab.el.removeClass(this.options.tabModel.clsOff).addClass(this.options.tabModel.clsOn);
	},
	
	hideTab: function(tab){
		tab.el.removeClass(this.options.tabModel.clsOn).addClass(this.options.tabModel.clsOff);
	}
	
	
	
}, 'tabs');
*/



