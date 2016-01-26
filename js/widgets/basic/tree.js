


/**
 * Дерево
 *
 * :`tree`
 *
 * @class
 * @name Ergo.widgets.Tree
 * @extends Ergo.widgets.NestedList
 */
Ergo.defineClass('Ergo.widgets.Tree', 'Ergo.widgets.NestedList', /** @lends Ergo.widgets.Tree.prototype */{

	defaults: {
//		cls: 'tree'
		// node: {
			// etype: 'link'
		// }
//		dynamic: true,

		defaultItem: {
			etype: 'tree-item'
		},

		nestedItem: {
			components: {
				sub: {
					hidden: true,
//					dataId: 'children',
//					dynamic: true,
					include: 'effects',
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 400
//						initial: false
					}
				}
			}
		}


	}



}, 'widgets:tree');





Ergo.defineClass('Ergo.widgets.TreeItem', 'Ergo.widgets.NestedItem', /** @lends Ergo.widgets.TreeItem.prototype */{

	defaults: {

		tag: 'li',

		transitions: {
			'* > expanded': function() { this.$sub.show(); },
			'expanded > *': function() { this.$sub.hide(); }
		},

		components: {
			sub: {
				etype: 'tree'
			}
		}

	},





	// toggle: function() {
	// 	this.states.toggle('expanded');
	// }


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


}, 'widgets:tree-item');
