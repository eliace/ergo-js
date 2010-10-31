

Dino.declare('Dino.widgets.TreeNode', 'Dino.Widget', {

	defaultOptions: {
		cls: 'dino-tree-node',
		components: {
//			content: {
//				dtype: 'text'
//			},
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
		
		this.isLeaf = o.isLeaf;
				
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
/*	
			button: {
				weight: 3,
				dtype: 'icon',
				clickable: true,
				onClick: function() {
					this.parent.states.toggle('collapsed');
				}				
			},
*/			
			content: {
				dtype: 'box',
				components: {	
					indent: {
						weight: 0,
						dtype: 'box',
						wrapEl: '<span></span>',
						layout: {
							dtype: 'bar-layout',
							clearfix: false
						},
						defaultItem: {
							dtype: 'text',
							cls: 'indent'
						},
						items: []
					},					
//					button: {
//						weight: 1,
//						dtype: 'icon',
//						clickable: true,
//						onClick: function() {
//							this.parent.parent.states.toggle('collapsed');
//						}										
//					},
					content: {
						dtype: 'text-item'						
					}
				},
				weight: 1
			},
			subtree: {
				weight: 2,
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
	
	
	_init: function() {
		Dino.widgets.BasicTreeNode.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		if('indent' in o) {
			for(var i = o.indent-1; i >= 0; i--) o.components.content.components.indent.items.push({cls: 'indent-'+i, indent: i});
			o.components.subtree.defaultItem.indent = o.indent+1;
		}
	},
	
	_opt: function(o) {
		Dino.widgets.BasicTreeNode.superclass._opt.call(this, o);
		
		if('label' in o) this.content.content.opt('label', o.label);
		if('format' in o) this.content.content.opt('format', o.format);
				
	},
	
	_events: function(self) {
		Dino.widgets.BasicTreeNode.superclass._events.apply(this, arguments);
		
//		this.events.reg('onStateChanged', function(e) {
//			e.translateStateTo(this.button);
//			e.translateStateTo(this.content);
//			e.translateStateTo(this.subtree);
//		});

//		this.content.el.click(function(){
//			if(self.options.toggleOnClick)
//				self.states.toggle('collapsed');
//		});		
	},
	
	_afterBuild: function() {
		Dino.widgets.BasicTreeNode.superclass._afterBuild.apply(this, arguments);
		
		this.states.set( (this.options.expandOnShow) ? 'expanded': 'collapsed' );
	},
	
	getText: function() {
		return this.content.content.getText();
	}
	
	
}, 'basic-tree-node');







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
Dino.declare('Dino.widgets.SimpleTree', 'Dino.Widget', {}, 'simple-tree');


/*
Dino.declare('Dino.widgets.Tree', 'Dino.Widget', {
	
	defaultOptions: {
		cls: 'tree'
	
	
	}
	
	
	
}, 'tree');
*/


