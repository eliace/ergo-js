

/**
 * Базовый класс для контейнеров
 * 
 * Параметры:
 * 	itemFactory
 * 	layout
 * 	items
 * 
 */
Dino.declare('Dino.Container', Dino.Widget, {
	
	defaultOptions: {
		itemFactory: function(opts) { 
			return Dino.widget(opts); 
		},
		layout: 'plain-layout'
	},
	
	
	_init: function() {
		Dino.Container.superclass._init.apply(this);
		
		var o = this.options;
		
//		this.layout = new Dino.layouts.PlainLayout();
//		this.layout.container = this;
		
//		if('itemFactory' in o) this.itemFactory = o.itemFactory;
		
		var layoutOpts = o.layout;
		if( Dino.isString(layoutOpts) ) 
			layoutOpts = {dtype: layoutOpts};
		this.layout = Dino.object(layoutOpts);
		this.layout.container = this;
		
		
		if('items' in o){
			for(var i = 0; i < o.items.length; i++){
				var item = this.options.itemFactory(o.items[i]);
				this.addChild(item);
			}
		}
		
	},	
/*	
	_opt: function(o) {
		Dino.Container.superclass._opt.call(this, o);
		
//		if('defaultItemType')
		
	},
*/	
	_dataChanged: function() {
		this.eachChild(function(item) { item._dataChanged(); });
	},
	
	addChild: function(item) {
		Dino.Container.superclass.addChild.call(this, item);
//		this.addChild(item);
		this.layout.insert(item);
		return item;
	},
	
	removeChild: function(item) {
		Dino.Container.superclass.removeChild.call(this, item);
//		this.removeChild(item);
		this.layout.remove(item);
	},
	
	removeAllChildren: function() {
		Dino.Container.superclass.removeAllChildren.call(this);
//		this.removeAllChildren();
		this.layout.clear();
	}
	
/*	
	eachItem: function(callback) {
		this.eachChild(callback);
	}
*/	
});


