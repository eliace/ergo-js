



/**
 * Вложенный список
 * 
 * :`nested-list`
 * \s	[~]:`nested-item`
 *  
 * Опции:
 * 	`nestedItem`
 * 
 * @class
 * @name Ergo.widgets.NestedList
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.NestedList', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<ul/>',
//		cls: 'tree',
		dynamic: true,
		defaultItem: {
			etype: 'nested-item'
		}
		
	},
	
	_pre_construct: function(o) {
		this._super(o);
		
		o.defaultItem = Ergo.smart_override({components: {sub: {nestedItem: o.nestedItem}}}, o.nestedItem, o.defaultItem); //FIXME эмуляция обратной перегрузки
	},



	find_path: function(key) {
		
		var path = key.split(':');
		var w = this;
		var found = null;
		for(var i = 0; i < path.length; i++) {
			w = w.item({_name: path[i]});
			found = w;
			if(!w) break;
			w = w.$sub;
		}
		
		return found;
	},
	
	
	walk_path: function(key, callback) {
		
		var path = key.split(':');
		var w = this;
		
		for(var i = 0; i < path.length; i++) {
			w = w.item({_name: path[i]});
			callback.call(this, w);   //TODO необходимо реализовать цепочку асинхронных вызовов
			w = w.$sub;
		}
		
	}

	
	
	
}, 'widgets:nested-list');	






/**
 * Вложенный список
 * 
 * :`nested-item`
 * \s	content:`text`
 * \s subtree:`nested-list`
 *  
 * Опции:
 * 	`nestedItem`
 * 
 * @class
 * @name Ergo.widgets.NestedItem
 * @extends Ergo.widgets.Box
 */
Ergo.defineClass('Ergo.widgets.NestedItem', 'Ergo.widgets.Box', /** @lends Ergo.widgets.NestedItem.prototype */{
	
	defaults: {
		
		html: '<li/>',
		
		components: {
			content: {
				etype: 'text'
			},
			sub: {
				etype: 'nested-list',
				autoRender: 'non-empty',
				dynamic: true,
				dataId: 'children',
				weight: 100
			}
		}
		
	},
	
	
	
	/**
	 * Путь к элементу вложенного списка 
	 */
	path: function() {
		
    var path = [];
    var w = this;//.parent;
    while(w && w._name) {
      path.push(w._name);
      w = w.parent.parent;
    }
    
    return path.reverse().join(':');
	}
	
	
}, 'widgets:nested-item');



