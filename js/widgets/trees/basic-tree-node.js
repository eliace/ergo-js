
//= require "tree-node"
//= require <widgets/text-item>
//= require <extensions/effects>


/**
 * @class
 * @extends Ergo.widgets.TreeNode
 */
Ergo.widgets.BasicTreeNode = Ergo.declare('Ergo.widgets.BasicTreeNode', 'Ergo.widgets.TreeNode', /** @lends Ergo.widgets.BasicTreeNode.prototype */{
	
//	defaultCls: 'e-basic-tree-node',
	
	defaults: {
		baseCls: 'e-basic-tree-node',
		components: {
			content: {
				etype: 'box',
				cls: 'tree-list-item',
				weight: 10,
				components: {
					button: {
						weight: 10,
						etype: 'icon',
						cls: 'e-tree-node-button',
						onClick: function(e) {
							this.parent.parent.states.toggle('expand-collapse');
							e.baseEvent.stopPropagation();							
						}
					},
					text: {
						etype: 'text-item',
						cls: 'e-tree-node-content',
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
					// initial: {
						// show: 'show',
						// delay: 0
					// }
				},
				extensions: ['effects']
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
		expandOnShow: false,
		set: {
			'text': function(v) { this.content.text.opt('text', v); },
			'icon': function(v) { this.content.text.opt('icon', v); },
			'isLeaf': function(v) { this.content.button.states.set('leaf'); }
		}			
	},
	
	
	
	// $init: function(o) {
		// Ergo.widgets.BasicTreeNode.superclass.$init.apply(this, arguments);		
	// },
	
	// $opt: function(o) {
		// Ergo.widgets.BasicTreeNode.superclass.$opt.call(this, o);
// 		
		// var c = this.content;
// 		
		// if('isLeaf' in o) c.button.states.set('leaf');
// 		
		// if('icon' in o) c.text.opt('icon', o.icon);
// //		if('text' in o) c.text.opt('text', o.text);
// 
	// },
	
//	$events: function(self) {
//		Ergo.widgets.BasicTreeNode.superclass.$events.apply(this, arguments);
//		
//	},
	
	$afterBuild: function() {
		this.$super();
//		Ergo.widgets.BasicTreeNode.superclass.$afterBuild.apply(this, arguments);
		
		this.states.toggle('expand-collapse', this.options.expandOnShow);
		
//		(this.options.expandOnShow) ? this.states.set('expand-collapse') : this.states.clear('expand-collapse');
		
//		this.states.set( (this.options.expandOnShow) ? 'expanded': 'collapsed' );
	},
	
	getText: function() {
		return this.content.text.getText();
	}
	
	
}, 'basic-tree-node');


