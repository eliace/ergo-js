


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
			return Dino.widget(o); 
		}
	},
		
	_init: function() {
		Dino.Container.superclass._init.apply(this);
		
		var o = this.options;
		
//		this.layout = new Dino.layouts.PlainLayout();
//		this.layout.container = this;
		
//		if('itemFactory' in o) this.itemFactory = o.itemFactory;
		
		
//		// инициализируем метод фабрики объектов
//		this.itemFactory = function(o){
//			return {'widget': Dino.widget(o)};
//		};
		
		this.items = [];
		
//		this.items = new Dino.utils.ContainerItemManager(this, o.itemFactory);
				
	},	

	_opt: function(o) {
		Dino.Container.superclass._opt.call(this, o);
		
		if('itemFactory' in o)
			this.itemFactory = o.itemFactory;
		
		if('items' in o){
			for(var i = 0; i < o.items.length; i++)
				this.addItem(o.items[i]);
		}
		
	},

	
//	_afterRender: function() {
//		Dino.Container.superclass._afterRender.apply(this);
//	},

	//FIXME по идее этот мето должен быть в Dino.Widget
//	_dataChanged: function() {
//		this.children.each(function(item) { item._dataChanged(); });
//	},
	

	getItem: function(i){
		return this.children.get(i);
	},
	
	addItem: function(item, key) {
//		Dino.Container.superclass.addChild.call(this, item);
		
		var itemOpts = item;
		
		// если новый элемент является набором параметров, то строим виджет
		if( Dino.isPlainObject(item) ) item = this.itemFactory( Dino.utils.overrideOpts({}, this.options.defaultItem, item) );
		
		this.items.push( item );
		item.index = this.items.length - 1; //parseInt(this.children.size()-1);		
		
		this.children.add(item);
		this.layout.insert(item, key);
		
		if('show' in item) item.show();
//		if(item.el.parents().is('body')) item._afterRender();
	
//		item.events.fire('onAdded');
		this.events.fire('onItemAdded', {'item': item});		
		
		return item;
	},
	
	removeItem: function(item) {
//		Dino.Container.superclass.removeChild.call(this, item);		
		this.children.remove(item);
		this.layout.remove(item);
	},
	
	removeAllItems: function() {
//		Dino.Container.superclass.removeAllChildren.call(this);
//		for(var i = 0; i < this.items.length; i++)
//			this.removeItem(this.items[i]);
		var self = this;
		this.children.each(function(item){ self.layout.remove(item); });
		this.children.removeAll();
//		this.layout.clear();
	},
	
	replaceItem: function(criteria, newItem) {
		var item = this.children.get(criteria);
		if(item != null) this.removeItem(item);
		this.addItem(newItem);
	},
	
	eachItem: function(callback) {
//		for(var i = 0; i < this.items.length; i++)
//			callback.call(this, this.items[i], i);
		this.children.each(callback);
	},
	
	/**
	 * Подключаем данные.
	 * 
	 * data массив или ArrayDataSource
	 * 
	 */
	setData: function(data, phase) {
		
		if(!this.options.dynamic) {
			Dino.Container.superclass.setData.apply(this, arguments);
			return;
		}
		
		
		if(data == undefined) return;
		
		var o = this.options;
		
		if(!phase) phase = 1;
		
		this.dataPhase = phase;
		
		
		if('dataId' in o)
			this.data = (data instanceof Dino.data.DataSource) ? data.item(o.dataId) : new Dino.data.ArrayDataSource(data, o.dataId);
		else
			this.data = (data instanceof Dino.data.DataSource) ? data : new Dino.data.ArrayDataSource(data);
		
		
		var self = this;
		
		// если добавлен новый элемент данных, то добавляем новый виджет
		this.data.events.reg('onItemAdded', function(e){
			self.addItem({
				'data': self.data.item(e.index)
			});
		});
		
		// если элемент данных удален, то удаляем соответствующий виджет
		this.data.events.reg('onItemDeleted', function(e){
			self.removeItem( self.getItem(e.index) );// {data: self.data.item(e.index)});
		});
		
		
		this.removeAllItems();
		
		this.data.each(function(val, i){
			var dataItem = self.data.item(i);
			self.addItem({ 'data': dataItem });
		});
		
		
//		// всем предопределенным виджетам подсоединяем источники данных
//		this.eachItem(function(item, i){
//			item.setData( self.data.item(i) )
//		});
		this.children.each(function(child){
			if(child.dataPhase != 1) child.setData(self.data, 2);
		});
	}/*,

	_dataChanged: function() {
		
		if(!this.options.dynamic) {
			Dino.Container.superclass._dataChanged.call(this);
			return;	
		}
		
		var self = this;
		this.data.each(function(val, i){
			var dataItem = self.data.item(i);
			var widgetItem = null;
			self.eachItem(function(item) {
				if(item.options.data)
			});
			if(!self.getItem({'data': dataItem}))
				self.addItem({ 'data': dataItem });
		});
	}
*/	
	
}, 'container');


