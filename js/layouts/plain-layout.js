

/*
 * Эта компоновка сразу добавляет элемент в контейнер.
 * Методы update и rebuild ничего не выполняют
 * 
 */
Dino.declare('Dino.layouts.PlainLayout', Dino.Layout, {
	
	insert: function(item) {
		this.el.append( item.el );
		
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
	},
	
	remove: function(item) {
		item.el.remove(); //TODO опасный момент: все дочерние DOM-элементы уничтожаются
		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},
	
	clear: function() {
		this.el.empty(); //WARN еще опасный момент все дочерние DOM-элементы уничтожаются
	}
		
}, 'plain-layout');