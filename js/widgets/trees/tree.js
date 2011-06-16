
//= require <containers/list>
//= require <widgets/text-item>


/**
 * @class
 * @extends Dino.core.Widget
 */
Dino.widgets.TreeNode = Dino.declare('Dino.widgets.TreeNode', 'Dino.core.Widget', /** @lends Dino.widgets.TreeNode.prototype */{

	defaults: {
		cls: 'dino-tree-node',
		components: {
			subtree: {
				dtype: 'container',
				html: '<ul></ul>',
				defaultItem: {
					dtype: 'tree-node'
				}
			}
		},
		states: {
			'expand-collapse': ['expanded', 'collapsed']
		}
	},
	
	
	$html: function() { return '<li></li>'; },
	
	$init: function() {
		Dino.widgets.TreeNode.superclass.$init.apply(this, arguments);
		
		var o = this.options;
		
		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}

		if('defaultSubItem' in o){
			Dino.smart_override(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
	},
	
	
//	$opt: function(o) {
//		Dino.widgets.TreeNode.superclass.$opt.apply(this, arguments);
//		
//	},
	
	collapse: function() {
		this.states.clear('expand-collapse');
	},
	
	expand: function() {
		this.states.set('expand-collapse');
	},
	
//	isSelected: function() {
//		return this.states.is('selected');
//	},
	
	walkSubtree: function(callback) {
		if( callback.call(this, this) === false ) return false;
		return this.subtree.items.each(function(node){
			return node.walkSubtree(callback);
		});		
	},
	
	getParentNode: function() {
		var w = this.parent.parent;
		return (w instanceof Dino.widgets.TreeNode) ? w : undefined;
	}
	
}, 'tree-node');




/**
 * @class
 * @extends Dino.widgets.TreeNode
 */
Dino.widgets.BasicTreeNode = Dino.declare('Dino.widgets.BasicTreeNode', 'Dino.widgets.TreeNode', /** @lends Dino.widgets.BasicTreeNode.prototype */{
	
	
	defaults: {
//		baseCls: 'dino-basic-tree-node',
		components: {
			button: {
				weight: 1,
				dtype: 'icon',
				cls: 'dino-tree-node-button',
//				states: {
//					'leaf': 'hidden'
//				},
				events: {
					'click': function(e, w) {
						w.parent.states.toggle('expand-collapse');
						e.stopPropagation();
					}
				}
			},
			content: {
				dtype: 'text-item',
				cls: 'dino-tree-node-content',
				weight: 2
			},
			subtree: {
				weight: 3,
				dataId: 'children',
				defaultItem: {
					dtype: 'basic-tree-node'
				}
			}
		},
		states: {
			'expanded': function(on) {
				this.button.states.toggle('expanded', on);
				
				var o = this.options;
				if(o.effects && on) {
					var el = this.subtree.el;
 					if(el.children().size() == 0)
						el.show();
					else					
						el[o.effects.show](o.effects.delay);					
				}
			},
			'collapsed': function(on) {
				this.button.states.toggle('collapsed', on);

				var o = this.options;
				if(o.effects && on) {
					var el = this.subtree.el;
 					if(el.children().size() == 0)
						el.hide();
					else					
						el[o.effects.hide](o.effects.delay);					
				}
			}
		},
		expandOnShow: false,
		effects: {
			show: 'slideDown',
			hide: 'slideUp',
			delay: 200
		}
	},
	
	
	$init: function(o) {
		Dino.widgets.BasicTreeNode.superclass.$init.apply(this, arguments);		
	},
	
	$opt: function(o) {
		Dino.widgets.BasicTreeNode.superclass.$opt.call(this, o);
		
		if('isLeaf' in o) this.button.states.set('leaf');
		
		if('icon' in o) this.content.opt('icon', o.icon);
		if('text' in o) this.content.opt('text', o.text);
		if('format' in o) this.content.opt('format', o.format);

	},
	
	$events: function(self) {
		Dino.widgets.BasicTreeNode.superclass.$events.apply(this, arguments);
		
//		this.events.reg('onStateChanged', function(e) {
//			e.translate(this.button);
//			e.translate(this.content.leftIcon);
//		});

//		this.content.el.click(function(){
//			if(self.options.toggleOnClick)
//				self.states.toggle('collapsed');
//		});		
	},
	
	$afterBuild: function() {
		Dino.widgets.BasicTreeNode.superclass.$afterBuild.apply(this, arguments);
		
		(this.options.expandOnShow) ? this.states.set('expand-collapse') : this.states.clear('expand-collapse');
		
//		this.states.set( (this.options.expandOnShow) ? 'expanded': 'collapsed' );
	},
	
	getText: function() {
		return this.content.getText();
	}
	
	
}, 'basic-tree-node');






/*
Dino.declare('Dino.widgets.Tree', 'Dino.core.Widget', {
	
	$html: function() { return '<div></div>'; },
	
	defaults: {
		cls: 'tree',
		components: {
			content: {
				dtype: 'basic-tree-node',
				indent: 0,
				expandOnShow: true,
				defaultSubItem: {}
			}
		},
		treeModel: {
			node: {},
			indent: {}
		}
	},
	
	$init: function(o) {
//		Dino.widgets.Tree.superclass.$init.apply(this, arguments);
		this.constructor.superclass.$init.apply(this, arguments);
		
		Dino.smart_override(o.components.content.defaultSubItem, o.treeModel.node, {
			components: {
				content: {
					components: {
						indent: {
							defaultItem: o.treeModel.indent
						}
					}
				}			
			}
		});
		
		if('subtree' in o)
			o.components.content.subtree = o.subtree;
			
	}
	
	
	
}, 'tree');
*/

/*
Dino.declare('Dino.widgets.XTree', 'Dino.widgets.TextTreeItem', {
	
	$html: function() { return '<div></div>'; },
	
	defaults: {
		cls: 'tree',
		defaultSubItem: {
			dtype: 'text-tree-item'
			
//			components: {
//				button: {
//					states: {
//						'collapsed': function() { if(!this.parent.isLeaf) return ['ui-icon ui-icon-triangle-1-e', 'ui-icon ui-icon-triangle-1-se'] },
//						'expanded': function() { if(!this.parent.isLeaf) return ['ui-icon ui-icon-triangle-1-se', 'ui-icon ui-icon-triangle-1-e'] },
//						'hover': function() { if(!this.parent.isLeaf) return ['ui-icon-lightgray', 'ui-icon']; }
//					}
//				}
//			}
			
		},
		indent: 0,
		expandOnShow: true
	},
	
	$init: function() {
		Dino.widgets.Tree.superclass.$init.apply(this, arguments);		
		
		var o = this.options;
		
		if('isDynamic' in o) {
			o.components.subtree.dynamic = true;
			
			var dynamicSubItem = { 
				components: { 
					subtree: {
						dataId: 'children', 
						dynamic: true
					}
				}
			};
			
			//сложная перегрузка опции для того, чтобы приоритет пользовательских опций был выше
			o.components.subtree.defaultItem = Dino.smart_override({}, dynamicSubItem, {'defaultSubItem': dynamicSubItem}, o.components.subtree.defaultItem);
		}
		
	},
	
	$opt: function(o) {
		Dino.widgets.Tree.superclass.$opt.apply(this, arguments);
		
//		var self = this;
				
	},
	
	setSelectedNode: function(node_to_select) {
		this.walkSubtree(function(node){
			if(node.isSelected()) node.states.clear('selected');
		});
		node_to_select.states.set('selected');
		
		//TODO  здесь еще можно запомнить выбранный узел
	}
	
}, 'xtree');
*/








/**
 * Простое дерево с отступами.
 * 
 * @class
 * @extends Dino.containers.List
 */
Dino.widgets.Tree = Dino.declare('Dino.widgets.Tree', 'Dino.containers.List', /** @lends Dino.widgets.Tree.prototype */{
	
	defaults: {
		cls: 'dino-tree',
		defaultItem: {
			dtype: 'basic-tree-node',
			indent: 0,
			expandOnShow: true,
			defaultSubItem: {}
		},
		treeModel: {
			node: {}
		}		
	},
	
	
	$init: function(o){
		Dino.widgets.Tree.superclass.$init.apply(this, arguments);
		
		
		if('subtree' in o) 
			o.items = o.subtree;
		
		if('isDynamic' in o) {
			
			o.dynamic = true;
			
			var dynamicItem = {
				components: {
					subtree: {
						dynamic: true
					}
				}
			};
			
			Dino.smart_override(o.defaultItem, dynamicItem);
			Dino.smart_override(o.defaultItem.defaultSubItem, dynamicItem);
		}
		
		
		Dino.smart_override(o.defaultItem, o.treeModel.node);
		Dino.smart_override(o.defaultItem.defaultSubItem, o.treeModel.node);
		
	},
	
//	setSelected: function(node_to_select) {
//		
//		this.eachItem(function(item){
//			item.walkSubtree(function(node){
//				if(node.isSelected()){
//					node.states.clear('selected');
//					node.events.fire('onUnselected');
//				}
//			});
//		});
//		
//		if(node_to_select) {
//			node_to_select.states.set('selected');
//			node_to_select.events.fire('onSelected');
//			
//			this.selected_node = node_to_select;
//		}
//		
//	},
//	
//	getSelected: function() {
//		return this.selected_node;
//	},
	
	
	
	walkTree: function(callback) {
		this.items.each(function(item){
			return item.walkSubtree(function(node){
				return callback.call(this, node);
			});
		});		
	}
	
	
/*	
	getNode: function(criteria) {
		
		var f = null;
		
		if( _dino.isString(i) ) f = _dino.filters.by_props.curry({'tag': i});
		else if( _dino.isFunction(i) ) f = i;
		else if( _dino.isPlainObject(i) ) f = _dino.filters.by_props.curry(i);
		
		var result = null;
		
		this.eachItem(function(item){
			return item.walkSubtree(function(node){
				if( f.call(node) ) {
					result = node;
					return false;
				}
			});
		});
	}
*/	
	
}, 'tree');


/*
Dino.declare('Dino.widgets.Tree', 'Dino.core.Widget', {
	
	defaults: {
		cls: 'tree'
	
	
	}
	
	
	
}, 'tree');
*/


