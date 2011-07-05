
//= require "widget"
//= require "item-collection"

/**
 * @name Dino.containers
 * @namespace
 */


/**
 * Базовый класс для контейнеров.
 * 
 * @class
 * @name Dino.core.Container
 * @extends Dino.core.Widget
 * @param {Object} o параметры
 * 
 */
Dino.declare('Dino.core.Container', 'Dino.core.Widget', /** @lends Dino.core.Container.prototype */ {
	
	
	defaults: {
		defaultItemShortcuts: {},
		itemFactory: function(o) {
			if(Dino.isString(o)) o = this.options.defaultItemShortcuts[o];
			return Dino.widget( Dino.smart_override({}, this.options.defaultItem, o) );			
		}
	},
	
	$init: function(o) {
		Dino.core.Container.superclass.$init.apply(this, arguments);
		
		/**
		 * Элементы
		 * @type {Array}
		 */
		this.items = new Dino.core.ItemCollection(this);
		
//		if('items' in o)
//			o.components = o.items;

	},	
	
	
	
	
	
	
//	$componentFactory: function(item) {
//		if( Dino.isPlainObject(item) ) 
//			item = Dino.widget( Dino.smart_override({}, this.options.defaultItem, item) );
//		return item;
//	},
	
	
	$construct: function(o) {
		Dino.core.Container.superclass.$construct.apply(this, arguments);
		
		if('items' in o){
			for(var i = 0; i < o.items.length; i++)
				this.items.add(o.items[i]);
		}
				
	},

//	$opt: function(o) {
//		Dino.core.Container.superclass.$opt.call(this, o);
//		
//	},

	
//	$afterRender: function() {
//		Dino.core.Container.superclass.$afterRender.apply(this);
//	},

	//FIXME по идее этот мето должен быть в Dino.core.Widget
//	$dataChanged: function() {
//		this.children.each(function(item) { item.$dataChanged(); });
//	},
	
	
//	/**
//	 * Получить элемент контейнера 
//	 * 
//	 * @param {Object} criteria критерий
//	 * @returns {Dino.core.Widget} элемент контейнера или undefined
//	 */
//	getItem: function(i){
//		return this.items.find( Dino.utils.widget_filter(i) );
////		return Dino.find(this.items, Dino.utils.widget_filter(i));	
//	},
//	
//	/**
//	 * Добавить элемент контейнера
//	 * 
//	 * @param {Object|Dino.core.Widget} item виджет или параметры виджета
//	 * @param {Integer} index индекс, с которым будет добавлен новый элемент
//	 * @returns {Dino.core.Widget} добавленный элемент
//	 */
//	addItem: function(item, index) {
////		Dino.core.Container.superclass.addChild.call(this, item);
//		
//		var itemOpts = item;
//		
//		// если новый элемент является набором параметров, то строим виджет
//		item = this.$componentFactory( itemOpts );
////		if( Dino.isPlainObject(item) ) item = this.itemFactory( Dino.smart_override({}, this.options.defaultItem, item) );
//		
//		this.items.add(item);
//		this.children.add(item);
//
//		item.parent = this;			
//		
//		if(index == undefined){
////			this.items.push( item );
//			
//			item.index = this.items.size() - 1;
//			
////			this.children.add(item);
//			this.layout.insert(item);
//		}
//		else {
////			this.items.splice( index, 0, item );
//			
//			item.index = index;
////			this.items.each(function(it, i){ it.index = i; });
//			for(var i = index; i < this.items.src.length; i++) this.items.src[i].index = i;
//			
////			this.children.add(item, index);
//			this.layout.insert(item, index);
//		}
//		
//		
//		// выполняем автобиндинг
//		if(this.data && !item.data)
//			item.$bind(this.data, false, 2);
//				
//		
//		if('show' in item) item.show();
//		
//		this.events.fire('onItemAdded', {'item': item});
//		
//		return item;
//	},
//
//
//	/**
//	 * Удалить элемент.
//	 * 
//	 * @param {Object} item удаляемый элемент
//	 * @returns {Dino.core.Widget} удаленный элемент
//	 */
//	removeItem: function(item) {
//		
//		this.items.remove(item);
////		Dino.array_remove(this.items, item);
//
//		var index = item.index;
//		
////		this.children.remove(item);
//		this.layout.remove(item);
//		
//		delete item.parent
//		
////		this.items.each(function(it, i){ it.index = i; });
//		for(var i = index; i < this.items.src.length; i++) this.items.src[i].index = i;
//		
//		
//		return item;
//	},
//	
//	/**
//	 * Уничтожить элемент.
//	 * 
//	 * После удаления элементы вызывается метод {@link Dino.core.Object#destroy }
//	 * 
//	 * @param {Object} item
//	 */
//	destroyItem: function(item) {
//		this.removeItem(item).destroy();
//	},
//	
//	/**
//	 * Удаление всех элементов контейнера
//	 */
//	removeAllItems: function() {
//		while(this.items.length() > 0)
//			this.removeItem(this.items.first());
//
////		this.children.removeAll();
////		this.layout.clear(); //FIXME эта очистка вызывала ошибки
//	},
//	
//	/**
//	 * Уничтожение всех элементов контейнера
//	 */
//	destroyAllItems: function() {
////		// очищаем компоновку
////		this.layout.clear(); //FIXME эта очистка вызывала ошибки
////		// уничтожаем элементы
////		this.children.each(function(item){ item.destroy(); });
////		// очищаем список дочерних элементов
////		this.children.removeAll();
//
////		var t0 = Dino.timestamp();
//
//		while(this.items.length() > 0)
//			this.removeItem(this.items.first()).destroy();
//
////		var t1 = Dino.timestamp();	
////		console.log(t1 - t0);
//		
////		var self = this;
////		Dino.each(this.items, function(item){ self.removeItem(item); item.destroy(); });
//	},
//	
//	/**
//	 * Замена элемента
//	 * 
//	 * @param {Any} criteria критерий
//	 * @param {Object|Dino.core.Widget} newItem 
//	 */
//	replaceItem: function(criteria, newItem) {
//		var item = this.children.find(criteria);
//		if(item != null) this.removeItem(item);
//		this.addItem(newItem);
//	},
//	
//	/**
//	 * Последовательный обход всех элементов.
//	 * 
//	 * @param {Function} callback 
//	 */
//	eachItem: function(callback) {
//		this.items.each(callback);
////		for(var i = 0; i < this.items.length; i++)
////			if( callback.call(this, this.items[i], i) === false ) return false;
//	},
///*	
//	setSelectedItem: function(item) {
//		this.eachItem(function(it){ it.states.clear('selected'); });
//		item.states.set('selected');
//		this._selected_item = item;
//	},
//	
//	getSelectedItem: function() {
//		return this._selected_item;
//	},
//*/
	
	$bind: function(data, update, phase) {
		
		if(!this.options.dynamic) {
			Dino.core.Container.superclass.$bind.apply(this, arguments);
			return;
		}
		
		
		if(data == undefined) return;
		
		
		if(this.data)
			this.data.events.unreg(this);
		
		var o = this.options;
		
		if(!phase) phase = 1;
		
		this.dataPhase = phase;
		
		
		if('dataId' in o)
			this.data = (data instanceof Dino.core.DataSource) ? data.entry(o.dataId) : new Dino.core.DataSource(data, o.dataId);
		else
			this.data = (data instanceof Dino.core.DataSource) ? data : new Dino.core.DataSource(data);
		
		
		
		var self = this;
		
		// если добавлен новый элемент данных, то добавляем новый виджет
		this.data.events.reg('onEntryAdded', function(e){
			self.items.add({'data': e.entry}, e.isLast ? null : e.index);
		}, this);
		
		// если элемент данных удален, то удаляем соответствующий виджет
		this.data.events.reg('onEntryDeleted', function(e){
			self.items.remove( self.items.find({data: e.entry}) ).destroy();//e.index) );// {data: self.data.item(e.index)});
		}, this);
		
		// если элемент данных изменен, то создаем новую привязку к данным
		this.data.events.reg('onEntryChanged', function(e){
			self.item( e.entry.id ).$bind(self.data.entry(e.entry.id), false, 2);
//			self.getItem( e.item.id ).$dataChanged(); //<-- при изменении элемента обновляется только элемент
		}, this);

		// если изменилось само значение массива, то уничожаем все элементы-виджеты и создаем их заново
		this.data.events.reg('onValueChanged', function(e){
			
			self.layout.immediateRebuild = false;

			// уничтожаем все элементы-виджеты
			self.items.destroy_all();

//			var t0 = Dino.timestamp();

			self.data.iterate(function(dataEntry, i){
				var item = self.items.add({ 'data': dataEntry });
				item.dataPhase = 2;
			});
		
//			var t1 = Dino.timestamp();
//			console.log(t1 - t0);
				
			self.layout.immediateRebuild = true;
			self.layout.rebuild();
			
		}, this);
		

		this.layout.immediateRebuild = false;
				
		this.items.destroy_all();

		this.data.iterate(function(dataEntry, i){
			self.items.add({ 'data': dataEntry }).dataPhase = 2;
		});

		this.layout.immediateRebuild = true;
		this.layout.rebuild();
		
		
		if(update) this.$dataChanged();
		
//		this.events.fire('onDataBound');
		
		
		
//		console.log('update on data set');
		
//		// всем предопределенным виджетам подсоединяем источники данных
//		this.eachItem(function(item, i){
//			item.$bind( self.data.item(i) )
//		});
//		this.children.each(function(child){
//			if(child.dataPhase != 1) child.$bind(self.data, 2);
//		});
	},
	

	item: function(i) {
		return this.items.find(Dino.utils.widget_filter(i));		
	}
	
	
	/*,

	$dataChanged: function() {
		
		if(!this.options.dynamic) {
			Dino.core.Container.superclass.$dataChanged.call(this);
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




