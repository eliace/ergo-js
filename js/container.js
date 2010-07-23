

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
		itemFactory: function(o) {
			var opts = Dino.utils.override_opts({}, this.defaultItem, o); // сливаем параметры элемента и параметры элемента по умолчанию
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
		this.layout.attach(this);
		
		if('content' in o){
			var item = (o.content instanceof Dino.Widget) ? o.content : this.options.itemFactory(o.content);
			this.addItem(item);	
			this.content = item; // Это свойство нужно, чтобы точно знать что пользователь понимал под контентом
		}
		if('items' in o){
			for(var i = 0; i < o.items.length; i++){
				var item = (o.items[i] instanceof Dino.Widget) ? o.items[i] : this.options.itemFactory(o.items[i]);
				this.addItem(item);
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
	
	getItem: function(i){
		return this.getChild(i);
	},
	
	addItem: function(item) {
//		Dino.Container.superclass.addChild.call(this, item);
		this.addChild(item);
		this.layout.insert(item);
		return item;
	},
	
	removeItem: function(item) {
//		Dino.Container.superclass.removeChild.call(this, item);
		this.removeChild(item);
		this.layout.remove(item);
	},
	
	removeAllItems: function() {
//		Dino.Container.superclass.removeAllChildren.call(this);
		this.removeAllChildren();
		this.layout.clear();
	},
	
	
	eachItem: function(callback) {
		this.eachChild(callback);
	}
	
});


