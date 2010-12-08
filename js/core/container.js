

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
		return Dino.find(this.items, Dino.utils.create_widget_filter(i));	
	},
	
	addItem: function(item, index) {
//		Dino.Container.superclass.addChild.call(this, item);
		
		var itemOpts = item;
		
		// если новый элемент является набором параметров, то строим виджет
		if( Dino.isPlainObject(item) ) item = this.itemFactory( Dino.utils.overrideOpts({}, this.options.defaultItem, item) );
		
		
		if(index == undefined){
			this.items.push( item );
			
			item.index = this.items.length - 1;
			
			this.children.add(item);
			this.layout.insert(item);
		}
		else {
			this.items.splice( index, 0, item );
			
			item.index = index;
			for(var i = index; i < this.items.length; i++) this.items[i].index = i;
			
			this.children.add(item, index);
			this.layout.insert(item, index);
		}
		
		if('show' in item) item.show();
		
		this.events.fire('onItemAdded', {'item': item});
		
		return item;
	},
/*	
	insertItem: function(item, index) {
		
		var itemOpts = item;
		
		// если новый элемент является набором параметров, то строим виджет
		if( Dino.isPlainObject(item) ) item = this.itemFactory( Dino.utils.overrideOpts({}, this.options.defaultItem, item) );

		this.items.splice( index, 0, item );
		item.index = index;
		for(var i = index; i < this.items.length; i++) this.items[i].index = i;
		
		this.children.add(item, index);
		this.layout.insert(item, index);
		
		if('show' in item) item.show();
		
		this.events.fire('onItemAdded', {'item': item});
		
		return item;
	},
*/	
	removeItem: function(item) {
		
		Dino.remove_from_array(this.items, item);
		
		this.children.remove(item);
		this.layout.remove(item);
		return item;
	},
	
	destroyItem: function(item) {
		this.removeItem(item).destroy();
	},
	
	removeAllItems: function() {
		while(this.items.length > 0)
			this.removeItem(this.items[0]);

//		this.children.removeAll();
//		this.layout.clear(); //FIXME эта очистка вызывала ошибки
	},
	
	destroyAllItems: function() {
//		// очищаем компоновку
//		this.layout.clear(); //FIXME эта очистка вызывала ошибки
//		// уничтожаем элементы
//		this.children.each(function(item){ item.destroy(); });
//		// очищаем список дочерних элементов
//		this.children.removeAll();
		while(this.items.length > 0)
			this.removeItem(this.items[0]).destroy();
		
//		var self = this;
//		Dino.each(this.items, function(item){ self.removeItem(item); item.destroy(); });
	},
	
	replaceItem: function(criteria, newItem) {
		var item = this.children.get(criteria);
		if(item != null) this.removeItem(item);
		this.addItem(newItem);
	},
	
	eachItem: function(callback) {
		for(var i = 0; i < this.items.length; i++)
			if( callback.call(this, this.items[i], i) === false ) return false;
	},
/*	
	setSelectedItem: function(item) {
		this.eachItem(function(it){ it.states.clear('selected'); });
		item.states.set('selected');
		this._selected_item = item;
	},
	
	getSelectedItem: function() {
		return this._selected_item;
	},
*/	
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
			self.addItem({'data': e.item}, e.isLast ? null : e.index);
		});
		
		// если элемент данных удален, то удаляем соответствующий виджет
		this.data.events.reg('onItemDeleted', function(e){
			self.destroyItem( self.getItem(e.index) );// {data: self.data.item(e.index)});
		});
		
		// эсли элемент данных изменен, то создаем новую привязку к данным
		this.data.events.reg('onItemChanged', function(e){
			self.getItem( e.item.id ).setData(self.data.item(e.item.id), 2);
//			self.getItem( e.item.id )._dataChanged(); //<-- при изменении элемента обновляется только элемент
		});

		// если изменилось само значение массива, то уничожаем все элементы-виджеты и создаем их заново
		this.data.events.reg('onValueChanged', function(e){
			// уничтожаем все элементы-виджеты
			self.destroyAllItems();
			
			self.layout.immediateRebuild = false;
			
			self.data.each(function(val, i){
				var dataItem = self.data.item(i);
				self.addItem({ 'data': dataItem }).dataPhase = 2;//.setData(dataItem, 2);
			});

			self.layout.immediateRebuild = true;
			self.layout.rebuild();
			
		});
		
		
		this.destroyAllItems();

		this.layout.immediateRebuild = false;
		
		this.data.each(function(val, i){
			var dataItem = self.data.item(i);
			self.addItem({ 'data': dataItem }).dataPhase = 2;//.setData(dataItem, 2);
		});
		
		this.layout.immediateRebuild = true;
		this.layout.rebuild();
		
		
		this.events.fire('onDataBound');
		
		
//		console.log('update on data set');
		
//		// всем предопределенным виджетам подсоединяем источники данных
//		this.eachItem(function(item, i){
//			item.setData( self.data.item(i) )
//		});
//		this.children.each(function(child){
//			if(child.dataPhase != 1) child.setData(self.data, 2);
//		});
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


