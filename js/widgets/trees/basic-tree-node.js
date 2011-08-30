
//= require "tree-node"
//= require <widgets/text-item>
//= require <extensions/effects>


/**
 * @class
 * @extends Ergo.widgets.TreeNode
 */
Ergo.widgets.BasicTreeNode = Ergo.declare('Ergo.widgets.BasicTreeNode', 'Ergo.widgets.TreeNode', /** @lends Ergo.widgets.BasicTreeNode.prototype */{
	
	defaultCls: 'ergo-basic-tree-node',
	
	defaults: {
		components: {
			content: {
				etype: 'box',
				cls: 'tree-list-item',
				weight: 10,
				components: {
					button: {
						weight: 10,
						etype: 'icon',
						cls: 'ergo-tree-node-button',
						onClick: function(e) {
							this.parent.parent.states.toggle('expand-collapse');
							e.baseEvent.stopPropagation();							
						}
					},
					text: {
						etype: 'text-item',
						cls: 'ergo-tree-node-content',
						weight: 20						
					}
				}
			},				
			subtree: {
				weight: 30,
				dataId: 'children',
				defaultItem: {
					etype: 'basic-tree-node'
				},
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 200
				},
				extensions: [Ergo.Effects]
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
		Ergo.widgets.BasicTreeNode.superclass.$init.apply(this, arguments);		
	},
	
	$opt: function(o) {
		Ergo.widgets.BasicTreeNode.superclass.$opt.call(this, o);
		
		var c = this.content;
		
		if('isLeaf' in o) c.button.states.set('leaf');
		
		if('icon' in o) c.text.opt('icon', o.icon);
		if('text' in o) c.text.opt('text', o.text);

	},
	
//	$events: function(self) {
//		Ergo.widgets.BasicTreeNode.superclass.$events.apply(this, arguments);
//		
//	},
	
	$afterBuild: function() {
		Ergo.widgets.BasicTreeNode.superclass.$afterBuild.apply(this, arguments);
		
		(this.options.expandOnShow) ? this.states.set('expand-collapse') : this.states.clear('expand-collapse');
		
//		this.states.set( (this.options.expandOnShow) ? 'expanded': 'collapsed' );
	},
	
	getText: function() {
		return this.content.text.getText();
	}
	
	
}, 'basic-tree-node');


