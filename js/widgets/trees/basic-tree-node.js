
//= require "tree-node"
//= require <widgets/text-item>


/**
 * @class
 * @extends Dino.widgets.TreeNode
 */
Dino.widgets.BasicTreeNode = Dino.declare('Dino.widgets.BasicTreeNode', 'Dino.widgets.TreeNode', /** @lends Dino.widgets.BasicTreeNode.prototype */{
	
	
	defaults: {
		cls: 'dino-basic-tree-node',
		components: {
//			content: {
//				dtype: 'box',
//				cls: 'tree-list-item',
//				weight: 10,
//			components: {
			button: {
				weight: 10,
				dtype: 'icon',
				cls: 'dino-tree-node-button',
				onClick: function(e) {
					this.parent.states.toggle('expand-collapse');
					e.baseEvent.stopPropagation();							
				}
			},
			content: {
				dtype: 'text-item',
				cls: 'dino-tree-node-content',
				weight: 20						
			},
//				}
//			},				
			subtree: {
				weight: 30,
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
		
		var c = this;//.content;
		
		if('isLeaf' in o) c.button.states.set('leaf');
		
		if('icon' in o) c.content.opt('icon', o.icon);
		if('text' in o) c.content.opt('text', o.text);

	},
	
//	$events: function(self) {
//		Dino.widgets.BasicTreeNode.superclass.$events.apply(this, arguments);
//		
//	},
	
	$afterBuild: function() {
		Dino.widgets.BasicTreeNode.superclass.$afterBuild.apply(this, arguments);
		
		(this.options.expandOnShow) ? this.states.set('expand-collapse') : this.states.clear('expand-collapse');
		
//		this.states.set( (this.options.expandOnShow) ? 'expanded': 'collapsed' );
	},
	
	getText: function() {
		return this.content.getText();
	}
	
	
}, 'basic-tree-node');


