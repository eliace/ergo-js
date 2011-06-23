

Dino.declare('Dino.widgets.ListTreeNode', 'Dino.widgets.TreeNode', {
	
	
	defaults: {
//		baseCls: 'dino-basic-tree-node',
		html: '<li/>',
		indent: 0,
		components: {
			content: {
				dtype: 'box',
				cls: 'tree-list-item',
				weight: 10,
				components: {
					indent: {
						dtype: 'list',
						style: {'display': 'inline'},
						weight: 5,
						defaultItem: {
							dtype: 'text',
							cls: 'indent',
							innerHtml: '&nbsp;'
						}
					},
					button: {
						weight: 10,
						dtype: 'icon',
						cls: 'dino-tree-node-button',
		//				states: {
		//					'leaf': 'hidden'
		//				},
						events: {
							'click': function(e, w) {
								w.parent.parent.states.toggle('expand-collapse');
								e.stopPropagation();
							}
						}
					},
					content: {
						dtype: 'text-item',
						cls: 'dino-tree-node-content',
						weight: 20						
					}
				}				
			},
			subtree: {
				weight: 30,
				dataId: 'children',
				defaultItem: {
					dtype: 'list-tree-node'
				}
			}
		},
		states: {
			'expanded': function(on) {
				this.content.button.states.toggle('expanded', on);
				
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
				this.content.button.states.toggle('collapsed', on);

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
		Dino.widgets.ListTreeNode.superclass.$init.apply(this, arguments);
		
		o.components.subtree.defaultItem.indent = o.indent+1;		
	},
	
	
	$construct: function(o) {
		Dino.widgets.ListTreeNode.superclass.$construct.apply(this, arguments);
		
		for(var i = 0; i < o.indent; i++) {
			this.content.indent.items.add({});
		}		
	},
	
	
	$opt: function(o) {
		Dino.widgets.ListTreeNode.superclass.$opt.call(this, o);
		
		if('isLeaf' in o) this.content.button.states.set('leaf');
		
		if('icon' in o) this.content.content.opt('icon', o.icon);
		if('text' in o) this.content.content.opt('text', o.text);
		if('format' in o) this.content.content.opt('format', o.format);

	},
	
	$afterBuild: function() {
		Dino.widgets.ListTreeNode.superclass.$afterBuild.apply(this, arguments);
		
		(this.options.expandOnShow) ? this.states.set('expand-collapse') : this.states.clear('expand-collapse');
		
//		this.states.set( (this.options.expandOnShow) ? 'expanded': 'collapsed' );
	},
	
	getText: function() {
		return this.content.content.getText();
	}
	
	
}, 'list-tree-node');










/**
 * 
 * 
 * 
 * 
 */


var treeData = new Dino.data.ArrayDataSource([]);

$.getJSON('ajax/file_system.json', {}, function(data) { treeData.set(data) });
  
  
$.dino({
  dtype: 'tree',
  renderTo: '.preview',
  cls: 'tree-list dino-text-content',
	
	width: 400,
  
  data: treeData,
  
  isDynamic: true,
  
  treeModel: {
    node: {
			dtype: 'list-tree-node',
//      cls: 'dynamic-tree-node',
      components: {
        content: {
					content: {
//	          components: {
//	            leftIcon: {
//	              states: {
//	                'computer': 'silk-icon-computer',
//	                'drive': 'silk-icon-drive',
//	                'folder': 'silk-icon-folder',
//	                'file': 'silk-icon-page',
//	              }
//	            },
//	          },
	          icon: true,
	          dataId: 'name'						
					}
        }        
      },
      binding: function(val) {
//        this.opt('icon', val.type);
//        if(val.type == 'file') this.opt('isLeaf', true);        
        this.opt('icon', 'silk-icon-'+val.type);
        if(val.type != 'folder' && val.type != 'drive') this.opt('isLeaf', true);
      }
    }
  }
  
});








