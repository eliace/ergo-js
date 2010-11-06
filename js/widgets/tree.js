

Dino.declare('Dino.widgets.TreeNode', 'Dino.Widget', {

	defaultOptions: {
		cls: 'dino-tree-node',
		components: {
			subtree: {
				dtype: 'container',
				wrapEl: '<ul></ul>',
				defaultItem: {
					dtype: 'tree-node'
				}
			}
		}
	},
	
	
	_html: function() { return '<li></li>'; },
	
	_init: function() {
		Dino.widgets.TreeNode.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}

		if('defaultSubItem' in o){
			Dino.utils.overrideOpts(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
	},
	
	
	_opt: function(o) {
		Dino.widgets.TreeNode.superclass._opt.apply(this, arguments);
		
//		this.isLeaf = o.isLeaf;
				
	},
	
	collapse: function() {
		this.states.set('collapsed');
	},
	
	expand: function() {
		this.states.set('expanded');
	},
	
	isSelected: function() {
		return this.states.is('selected');
	},
	
	walkSubtree: function(callback) {
		callback.call(this, this);
		this.subtree.eachItem(function(node){
			node.walkSubtree(callback);
		});		
	}
	
}, 'tree-node');




Dino.declare('Dino.widgets.BasicTreeNode', 'Dino.widgets.TreeNode', {
	
	
	defaultOptions: {
//		baseCls: 'dino-basic-tree-node',
		components: {
			button: {
				weight: 1,
				dtype: 'icon',
				cls: 'dino-tree-node-button',
				states: {
					'leaf': 'dino-hidden'
				},
				clickable: true,
				onClick: function() {
					this.parent.states.toggle('collapsed');
				}
			},
			content: {
				dtype: 'text-item',
				cls: 'dino-tree-node-content',
				selectable: false,
				weight: 2
			},
			subtree: {
				weight: 3,
				defaultItem: {
					dtype: 'basic-tree-node'
				}
			}
		},
		states: {
			'expanded': ['expanded', 'collapsed'],
			'collapsed': ['collapsed', 'expanded']
		},
		expandOnShow: false
	},
	
	
	_init: function(o) {
		Dino.widgets.BasicTreeNode.superclass._init.apply(this, arguments);		
	},
	
	_opt: function(o) {
		Dino.widgets.BasicTreeNode.superclass._opt.call(this, o);
		
		if('label' in o) this.content.opt('label', o.label);
		if('format' in o) this.content.opt('format', o.format);
		if('isLeaf' in o) this.button.states.set('leaf');
				
	},
	
	_events: function(self) {
		Dino.widgets.BasicTreeNode.superclass._events.apply(this, arguments);
		
		this.events.reg('onStateChanged', function(e) {
			e.translate(this.button);
			e.translate(this.content.leftIcon);
		});

//		this.content.el.click(function(){
//			if(self.options.toggleOnClick)
//				self.states.toggle('collapsed');
//		});		
	},
	
	_afterBuild: function() {
		Dino.widgets.BasicTreeNode.superclass._afterBuild.apply(this, arguments);
		
		(this.options.expandOnShow) ? this.states.set('expanded') : this.states.set('collapsed');
		
//		this.states.set( (this.options.expandOnShow) ? 'expanded': 'collapsed' );
	},
	
	getText: function() {
		return this.content.getText();
	}
	
	
}, 'basic-tree-node');






/*
Dino.declare('Dino.widgets.Tree', 'Dino.Widget', {
	
	_html: function() { return '<div></div>'; },
	
	defaultOptions: {
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
	
	_init: function(o) {
//		Dino.widgets.Tree.superclass._init.apply(this, arguments);
		this.constructor.superclass._init.apply(this, arguments);
		
		Dino.utils.overrideOpts(o.components.content.defaultSubItem, o.treeModel.node, {
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
	
	_html: function() { return '<div></div>'; },
	
	defaultOptions: {
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
	
	_init: function() {
		Dino.widgets.Tree.superclass._init.apply(this, arguments);		
		
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
			o.components.subtree.defaultItem = Dino.utils.overrideOpts({}, dynamicSubItem, {'defaultSubItem': dynamicSubItem}, o.components.subtree.defaultItem);
		}
		
	},
	
	_opt: function(o) {
		Dino.widgets.Tree.superclass._opt.apply(this, arguments);
		
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
 */
Dino.declare('Dino.widgets.Tree', 'Dino.containers.Box', {
	
	defaultOptions: {
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
	
	
	_init: function(o){
		this.constructor.superclass._init.apply(this, arguments);
		
		
		if('subtree' in o) 
			o.items = o.subtree;
		
		if('isDynamic' in o) {
			
			o.dynamic = true;
			
			var dynamicItem = {
				components: {
					subtree: {
						dynamic: true,
						dataId: 'children'
					}
				}
			};
			
			Dino.utils.overrideOpts(o.defaultItem, dynamicItem);
			Dino.utils.overrideOpts(o.defaultItem.defaultSubItem, dynamicItem);
		}
		
		
		Dino.utils.overrideOpts(o.defaultItem, o.treeModel.node);
		Dino.utils.overrideOpts(o.defaultItem.defaultSubItem, o.treeModel.node);
		
	},
	
	setSelected: function(node_to_select) {
		
		this.eachItem(function(item){
			item.walkSubtree(function(node){
				if(node.isSelected()){
					node.states.clear('selected');
					node.events.fire('onUnselected');
				}
			});
		});
		
		if(node_to_select) {
			node_to_select.states.set('selected');
			node_to_select.events.fire('onSelected');
			
			this.selected_node = node_to_select;
		}
		
	},
	
	getSelected: function() {
		return this.selected_node;
	}
	
	
	
}, 'tree');


/*
Dino.declare('Dino.widgets.Tree', 'Dino.Widget', {
	
	defaultOptions: {
		cls: 'tree'
	
	
	}
	
	
	
}, 'tree');
*/


