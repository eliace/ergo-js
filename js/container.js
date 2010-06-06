

/**
 * Базовый класс для контейнеров
 * 
 * Опции:
 * 	itemFactory
 * 	layout
 * 	items
 * 
 */
Dino.declare('Dino.Container', Dino.Widget, {
	
	defaultOptions: {
		itemFactory: function(opts) {
			return Dino.object(opts);
		},
		layout: 'plain-layout'
	},
	
	
	initialize: function(o) {
		Dino.Container.superclass.initialize.call(this, o);
		
//		this.defaultItemType;
		this.layout = Dino.object({}, 'plain-layout');
		this.layout.container = this;
	},	
	
	options: function(o) {
		Dino.Container.superclass.options.call(this, o);
		
		if('itemFactory' in o) this.itemFactory = o.itemFactory;
		
		if('layout' in o){
			var layoutOpts = o.layout;
			if( Dino.isString(layoutOpts) ) 
				layoutOpts = {dtype: layoutOpts};
			this.layout = Dino.object(layoutOpts);
			this.layout.container = this;
		}
		
		if('items' in o){
			for(var i = 0; i < o.items.length; i++){
				var item = this.itemFactory(o.items[i]);
				this.addItem(item);
			}
		}
		
//		if('defaultItemType')
		
	},
	
	addItem: function(item) {
//		Dino.Container.superclass.addItem.call(this, item);
		this.addChild(item);
		this.layout.insert(item);
		return item;
	},
	
	removeItem: function(item) {
//		Dino.Container.superclass.removeItem.call(this, item);
		this.removeChild(item);
		this.layout.remove(item);
	},
	
	removeAllItems: function() {
//		Dino.Container.superclass.removeAllItems.call(this);
		this.removeAllChildren();
		this.layout.clear();
	},
	
	eachItem: function(callback) {
		this.eachChild(callback);
	}
	
});


