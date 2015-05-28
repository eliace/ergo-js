



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
		defaultItem: {
			etype: 'nested-item'
		},
		
		dynamic: true,
		
		nestedItem: {
			components: {
				subtree: {
					hidden: true,
					dataId: 'children',
					dynamic: true,
					include: 'effects',
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 400
					}
				}
			}
		}
	},
	
	_pre_construct: function(o) {
		this._super(o);
		
		o.defaultItem = Ergo.smart_override({components: {subtree: {nestedItem: o.nestedItem}}}, o.nestedItem, o.defaultItem); //FIXME эмуляция обратной перегрузки
	},
	
	
	find_path: function(key) {
		
		var path = key.split(':');
		var w = this;
		var found = null;
		for(var i = 0; i < path.length; i++) {
			w = w.item({_name: path[i]});
			found = w;
			if(!w) break;
			w = w.subtree;
		}
		
		return found;
	},
	
	
	walk_path: function(key, callback) {
		
		var path = key.split(':');
		var w = this;
		
		for(var i = 0; i < path.length; i++) {
			w = w.item({_name: path[i]});
			callback.call(this, w);   //TODO необходимо реализовать цепочку асинхронных вызовов
			w = w.subtree;
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
		
		transitions: {
			'* > expanded': function() { this.subtree.show(); },
			'expanded > *': function() { this.subtree.hide(); }
		},
		
		components: {
			// caret: {
				// etype: 'icon',
				// cls: 'caret',
				// weight: -10,
				// onClick: function() {
					// this.parent.states.toggle('expanded');
				// }
			// },
			content: {
				etype: 'text'
			},
			subtree: {
				etype: 'nested-list',
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
	
	
	// toggle: function() {
	// 	this.states.toggle('expanded');
	// }	
	

	// setText: function(v) {
		// this.content.opt('text', v);
	// }
	
	
	// getLeaf: function() {
		// return this.states.is('leaf');
	// },
// 	
	// setLeaf: function(v) {
		// this.states.toggle('leaf', v);
	// }
	
	
}, 'widgets:nested-item');



/**
 * Дерево
 * 
 * :`tree`
 * 
 * @class
 * @name Ergo.widgets.Tree
 * @extends Ergo.widgets.NestedList
 */
Ergo.defineClass('Ergo.widgets.Tree', 'Ergo.widgets.NestedList', /** @lends Ergo.widgets.Tree.prototype */{
	
	defaults: {
		cls: 'tree'
		// node: {
			// etype: 'link'
		// }
	}


}, 'widgets:tree');


