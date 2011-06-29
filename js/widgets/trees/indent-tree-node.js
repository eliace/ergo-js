
//= require "basic-tree-node"


Dino.declare('Dino.widgets.IndentTreeNode', 'Dino.widgets.BasicTreeNode', {
	
	defaultCls: 'dino-list-tree-node',
	
	defaults: {
		indent: 0,
		components: {
			content: {
				components: {
					indent: {
						dtype: 'list',
						style: {
							'display': 'inline'
						},
						weight: 5,
						defaultItem: {
							dtype: 'text',
							binding: false,
							cls: 'indent',
							innerHtml: '&nbsp;'
						}
					}
				}
			}
		}				
	},
	
	$init: function(o) {
		Dino.widgets.IndentTreeNode.superclass.$init.apply(this, arguments);
		
		o.components.subtree.defaultItem.indent = o.indent+1;		
	},
	
	
	$construct: function(o) {
		Dino.widgets.IndentTreeNode.superclass.$construct.apply(this, arguments);
		
		for(var i = 0; i < o.indent; i++) {
			this.content.indent.items.add({});
		}		
	}
	
		
}, 'indent-tree-node');
