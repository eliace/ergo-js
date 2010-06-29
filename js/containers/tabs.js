


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




