
//= require "tree-node"
//= require <widgets/text-item>
//= require <extensions/effects>


/**
 * @class
 * @extends Dino.widgets.TreeNode
 */
Dino.widgets.BasicTreeNode = Dino.declare('Dino.widgets.BasicTreeNode', 'Dino.widgets.TreeNode', /** @lends Dino.widgets.BasicTreeNode.prototype */{
	
	defaultCls: 'dino-basic-tree-node',
	
	defaults: {
		components: {
			content: {
				dtype: 'box',
				cls: 'tree-list-item',
				weight: 10,
				components: {
					button: {
						weight: 10,
						dtype: 'icon',
						cls: 'dino-tree-node-button',
						onClick: function(e) {
							this.parent.parent.states.toggle('expand-collapse');
							e.baseEvent.stopPropagation();							
						}
					},
					text: {
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
					dtype: 'basic-tree-node'
				},
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 200
				},
				extensions: [Dino.Effects]
			}
		},
		states: {
			'collapsed': function(on) {
				this.content.button.states.toggle('collapsed', on);
				
				if(on)
					return this.subtree.hide();
			},
			'expanded': function(on) {
				this.content.button.states.toggle('expanded', on);
				
				if(on)
					return this.subtree.show();
			}
						
		},
		expandOnShow: false
	},
	
	
	$init: function(o) {
		Dino.widgets.BasicTreeNode.superclass.$init.apply(this, arguments);		
	},
	
	$opt: function(o) {
		Dino.widgets.BasicTreeNode.superclass.$opt.call(this, o);
		
		var c = this.content;
		
		if('isLeaf' in o) c.button.states.set('leaf');
		
		if('icon' in o) c.text.opt('icon', o.icon);
		if('text' in o) c.text.opt('text', o.text);

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
		return this.content.text.getText();
	}
	
	
}, 'basic-tree-node');

