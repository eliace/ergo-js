


/*
Dino.declare('Dino.utils.ContainerItemManager', 'Dino.utils.WidgetCollectionManager', {
	
	
	initialize: function(owner, factory) {
		Dino.utils.ContainerItemManager.superclass.initialize.call(this, owner);
		this.factory = factory;
	},
	
	add: function(item, key) {
	
		// если параметр не является виджетом - то вызываем метод фабрики объектов
		if( Dino.isPlainObject(item) ) item = this.factory.call(this.owner, item);
		// вызываем метод superclass.add(item)
		Dino.utils.ContainerItemManager.superclass.add.call(this, item);
		// добавляем элемент в компоновку
		this.owner.layout.insert(item, key);
	
	//	item.events.fire('onAdded');
	//	this.events.fire('onItemAdded');
		
		return item;
	},
	
	remove: function(item) {
		//FIXME по идее, сюда можно передавать виджет или ключ
		Dino.utils.ContainerItemManager.superclass.remove.call(this, item);
		this.owner.layout.remove(item);
	},
	
	removeAll: function() {
		//FIXME по идее, сюда можно передавать виджет или ключ
		Dino.utils.ContainerItemManager.superclass.removeAll.call(this);
		this.owner.layout.clear();
	}
	
	
});
*/











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
//		itemFactory: function(o) {
//			return Dino.widget(o); 
//		},
		layout: 'plain-layout'
	},
		
	_init: function() {
		Dino.Container.superclass._init.apply(this);
		
		var o = this.options;
		
//		this.layout = new Dino.layouts.PlainLayout();
//		this.layout.container = this;
		
//		if('itemFactory' in o) this.itemFactory = o.itemFactory;
		
		// инициализируем компоновку
		var layoutOpts = o.layout;
		if( Dino.isString(layoutOpts) )
			layoutOpts = {dtype: layoutOpts};
		this.layout = Dino.object(layoutOpts);
		this.layout.attach(this);
		
//		// инициализируем метод фабрики объектов
		this.itemFactory = function(o){
			return {'widget': Dino.widget(o)};
		};
		
		this.items = [];
		
//		this.items = new Dino.utils.ContainerItemManager(this, o.itemFactory);
				
	},	

	_opt: function(o) {
		Dino.Container.superclass._opt.call(this, o);
		
		if('itemFactory' in o)
			this.itemFactory = o.itemFactory;
		
		if('content' in o){
			this.content = this.addItem(o.content);
		}

		if('items' in o){
			for(var i = 0; i < o.items.length; i++)
				this.addItem(o.items[i]);
		}
		
	},
	
	
	//FIXME по идее этот мето должен быть в Dino.Widget
	_dataChanged: function() {
		this.children.each(function(item) { item._dataChanged(); });
	},
	

	getItem: function(i){
		return this.children.get(i);
	},
	
	addItem: function(item, key) {
//		Dino.Container.superclass.addChild.call(this, item);
		
		// если новый элемент является набором параметров, то строим виджет
		if( Dino.isPlainObject(item) ) item = this.itemFactory( Dino.utils.overrideOpts({}, this.options.defaultItem, item) );
		
		this.items.push( item );
		item.index = this.items.length - 1; //parseInt(this.children.size()-1);		
		
		if('widget' in item){
			this.children.add(item.widget);
			this.layout.insert(item.widget, key);
		}
	
//		item.events.fire('onAdded');
//		this.events.fire('onItemAdded');
		
		
		return item;
	},
	
	removeItem: function(item) {
//		Dino.Container.superclass.removeChild.call(this, item);
		if('widget' in item){
			this.children.remove(item.widget);
			this.layout.remove(item.widget);
		}
	},
	
	removeAllItems: function() {
//		Dino.Container.superclass.removeAllChildren.call(this);
		for(var i = 0; i < this.items.length; i++)
			this.removeItem(this.items[i]);
//		this.children.removeAll();
//		this.layout.clear();
	},
	
	
	eachItem: function(callback) {
		for(var i = 0; i < this.items.length; i++)
			callback.call(this, this.items[i], i);
//		this.children.each(callback);
	}
	
});


