



/**
 * Вложенный список
 * 
 * :nested-list
 * 	[~]:nested-item
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
					mixins: ['effects'],
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



Ergo.defineClass('Ergo.widgets.NestedItem', 'Ergo.widgets.Box', {
	
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
	
	
	path: function() {
		
    var path = [];
    var w = this;//.parent;
    while(w._name) {
      path.push(w._name);
      w = w.parent.parent;
    }
    
    return path.reverse().join(':');
	},
	
	
	
	
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




Ergo.defineClass('Ergo.widgets.Tree', 'Ergo.widgets.NestedList', {
	
	defaults: {
		cls: 'tree'
		// node: {
			// etype: 'link'
		// }
	}


}, 'widgets:tree');


