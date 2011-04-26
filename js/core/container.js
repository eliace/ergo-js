
/**
 * @name Dino.containers
 * @namespace
 */


/**
 * Базовый класс для контейнеров.
 * 
 * @class
 * @name Dino.Container
 * @extends Dino.Widget
 * @param {Object} o параметры
 * 
 */
Dino.declare('Dino.Container', 'Dino.Widget', /** @lends Dino.Container.prototype */ {
	
	
	defaultOptions: {
		itemFactory: function(o) {
			return Dino.widget(o); 
		}
	},
	
	$init: function(o) {
		Dino.Container.superclass.$init.apply(this);
		
		var o = this.options;
		
//		this.layout = new Dino.layouts.PlainLayout();
//		this.layout.container = this;
		
//		if('itemFactory' in o) this.itemFactory = o.itemFactory;
		
		
//		// инициализируем метод фабрики объектов
//		this.itemFactory = function(o){
//			return {'widget': Dino.widget(o)};
//		};
		
		/**
		 * Элементы
		 * @type {Array}
		 */
		this.items = [];
//		this.selection = new Dino.SelectionManager();
		
//		this.items = new Dino.utils.ContainerItemManager(this, o.itemFactory);
				
	},	

	$opt: function(o) {
		Dino.Container.superclass.$opt.call(this, o);
		
		if('itemFactory' in o)
			this.itemFactory = o.itemFactory;
		
		if('items' in o){
			for(var i = 0; i < o.items.length; i++)
				this.addItem(o.items[i]);
		}
		
	},

	
//	$afterRender: function() {
//		Dino.Container.superclass.$afterRender.apply(this);
//	},

	//FIXME по идее этот мето должен быть в Dino.Widget
//	$dataChanged: function() {
//		this.children.each(function(item) { item.$dataChanged(); });
//	},
	
	
	/**
	 * Получить элемент контейнера 
	 * 
	 * @param {Object} criteria критерий
	 * @returns {Dino.Widget} элемент контейнера или undefined
	 */
	getItem: function(i){
		return Dino.find(this.items, Dino.utils.create_widget_filter(i));	
	},
	
	/**
	 * Добавить элемент контейнера
	 * 
	 * @param {Object|Dino.Widget} item виджет или параметры виджета
	 * @param {Integer} index индекс, с которым будет добавлен новый элемент
	 * @returns {Dino.Widget} добавленный элемент
	 */
	addItem: function(item, index) {
//		Dino.Container.superclass.addChild.call(this, item);
		
		var itemOpts = item;
		
		// если новый элемент является набором параметров, то строим виджет
		if( Dino.isPlainObject(item) ) item = this.itemFactory( Dino.smart_override({}, this.options.defaultItem, item) );
		
		
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
		if( Dino.isPlainObject(item) ) item = this.itemFactory( Dino.smart_override({}, this.options.defaultItem, item) );

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


	/**
	 * Удалить элемент.
	 * 
	 * @param {Object} item удаляемый элемент
	 * @returns {Dino.Widget} удаленный элемент
	 */
	removeItem: function(item) {
		
		Dino.remove_from_array(this.items, item);

		var index = item.index;
		
		this.children.remove(item);
		this.layout.remove(item);
		
		for(var i = index; i < this.items.length; i++) this.items[i].index = i;
		
		
		return item;
	},
	
	/**
	 * Уничтожить элемент.
	 * 
	 * После удаления элементы вызывается метод {@link Dino.BaseObject#destroy }
	 * 
	 * @param {Object} item
	 */
	destroyItem: function(item) {
		this.removeItem(item).destroy();
	},
	
	/**
	 * Удаление всех элементов контейнера
	 */
	removeAllItems: function() {
		while(this.items.length > 0)
			this.removeItem(this.items[0]);

//		this.children.removeAll();
//		this.layout.clear(); //FIXME эта очистка вызывала ошибки
	},
	
	/**
	 * Уничтожение всех элементов контейнера
	 */
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
	
	/**
	 * Замена элемента
	 * 
	 * @param {Any} criteria критерий
	 * @param {Object|Dino.Widget} newItem 
	 */
	replaceItem: function(criteria, newItem) {
		var item = this.children.get(criteria);
		if(item != null) this.removeItem(item);
		this.addItem(newItem);
	},
	
	/**
	 * Последовательный обход всех элементов.
	 * 
	 * @param {Function} callback 
	 */
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
	
	$bind: function(data, phase) {
		
		if(!this.options.dynamic) {
			Dino.Container.superclass.$bind.apply(this, arguments);
			return;
		}
		
		
		if(data == undefined) return;
		
		
		if(this.data)
			this.data.events.unreg(this);
		
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
		}, this);
		
		// если элемент данных удален, то удаляем соответствующий виджет
		this.data.events.reg('onItemDeleted', function(e){
			self.destroyItem( self.getItem({data: e.item}) );//e.index) );// {data: self.data.item(e.index)});
		}, this);
		
		// если элемент данных изменен, то создаем новую привязку к данным
		this.data.events.reg('onItemChanged', function(e){
			self.getItem( e.item.id ).$bind(self.data.item(e.item.id), 2);
//			self.getItem( e.item.id ).$dataChanged(); //<-- при изменении элемента обновляется только элемент
		}, this);

		// если изменилось само значение массива, то уничожаем все элементы-виджеты и создаем их заново
		this.data.events.reg('onValueChanged', function(e){
			
			self.layout.immediateRebuild = false;
			
			// уничтожаем все элементы-виджеты
			self.destroyAllItems();

			self.data.each(function(dataItem, i){
				var dataItem = self.data.item(i);
				var item = self.addItem({ 'data': dataItem });//.$bind(dataItem, 2);
				item.dataPhase = 2;
//				item.index = i; // костыль для 
			});

			self.layout.immediateRebuild = true;
			self.layout.rebuild();
			
		}, this);
		

		this.layout.immediateRebuild = false;
		
		this.destroyAllItems();
		
		this.data.each(function(dataItem, i){
			var dataItem = self.data.item(i);
			self.addItem({ 'data': dataItem }).dataPhase = 2;//.$bind(dataItem, 2);
		});
		
		this.layout.immediateRebuild = true;
		this.layout.rebuild();
		
		
//		this.events.fire('onDataBound');
		
		
		
//		console.log('update on data set');
		
//		// всем предопределенным виджетам подсоединяем источники данных
//		this.eachItem(function(item, i){
//			item.$bind( self.data.item(i) )
//		});
//		this.children.each(function(child){
//			if(child.dataPhase != 1) child.$bind(self.data, 2);
//		});
	}/*,

	$dataChanged: function() {
		
		if(!this.options.dynamic) {
			Dino.Container.superclass.$dataChanged.call(this);
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




