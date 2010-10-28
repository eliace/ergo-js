


Dino.declare('Dino.containers.TreeBox', 'Dino.Container', {
	
	_html: function() { return '<ul></ul>'; }
	
}, 'tree-box');




Dino.declare('Dino.widgets.TreeItem', 'Dino.Widget', {

	defaultOptions: {
		components: {
			content: {
				dtype: 'text'
			},
			subtree: {
				dtype: 'tree-box',
				defaultItem: {
					dtype: 'tree-item'
				}
			}
		}
	},
	
	
	_html: function() { return '<li></li>'; },
	
	_init: function() {
		Dino.widgets.TreeItem.superclass._init.apply(this, arguments);
		
		var o = this.options;

		
		if('subtree' in o){
			o.components.subtree.items = o.subtree;
		}

		if('defaultSubItem' in o){
			Dino.utils.overrideOpts(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
	},
	
	
	_opt: function(o) {
		Dino.widgets.TreeItem.superclass._opt.apply(this, arguments);
		
		this.isLeaf = o.isLeaf;
				
	},
	
	collapse: function() {
		this.states.set('collapsed');
	},
	
	expand: function() {
		this.states.set('expanded');
	}
	
	
}, 'tree-item');




Dino.declare('Dino.widgets.TextTreeItem', 'Dino.widgets.TreeItem', {
	
	
	defaultOptions: {
		baseCls: 'dino-text-tree-item',
		components: {
			button: {
				weight: 3,
				dtype: 'icon',
				clickable: true,
				onClick: function() {
					this.parent.states.toggle('collapsed');
				}				
			},
			content: {
				weight: 1,
				dtype: 'text-item'
			},
			subtree: {
				weight: 2,
				defaultItem: {
					dtype: 'text-tree-item'
				}
			}
		},
		states: {
			'expanded': ['expanded', 'collapsed'],
			'collapsed': ['collapsed', 'expanded']
		},
		expandOnShow: false
	},
	
	_opt: function(o) {
		Dino.widgets.TextTreeItem.superclass._opt.call(this, o);
		
		if('label' in o) this.content.opt('label', o.label);
		if('format' in o) this.content.opt('format', o.format);
				
//		if(o.showLeftPanel) this.content.states.set('left-panel');
	},
	
	_events: function(self) {
		Dino.widgets.TextTreeItem.superclass._events.apply(this, arguments);
		
		this.events.reg('onStateChanged', function(e) {
			e.translateStateTo(this.button);
//			e.translateStateTo(this.content);
//			e.translateStateTo(this.subtree);
		});

		this.content.el.click(function(){
			if(self.options.toggleOnClick)
				self.states.toggle('collapsed');
		});		
	},
	
	_afterBuild: function() {
		Dino.widgets.TextTreeItem.superclass._afterBuild.apply(this, arguments);
		
		this.states.set( (this.options.expandOnShow) ? 'expanded': 'collapsed' );
	},
	
	getText: function() {
		return this.content.getText();
	}
	
	
}, 'text-tree-item');






Dino.declare('Dino.widgets.Tree', 'Dino.widgets.TreeItem', {
	
	_html: function() { return '<div></div>'; },
	
	defaultOptions: {
		cls: 'tree',
		defaultSubItem: {
			dtype: 'text-tree-item',
			components: {
				button: {
					states: {
						'collapsed': function() { if(!this.parent.isLeaf) return ['ui-icon ui-icon-triangle-1-e', 'ui-icon ui-icon-triangle-1-se'] },
						'expanded': function() { if(!this.parent.isLeaf) return ['ui-icon ui-icon-triangle-1-se', 'ui-icon ui-icon-triangle-1-e'] },
						'hover': function() { if(!this.parent.isLeaf) return ['ui-icon-lightgray', 'ui-icon']; }
					}
				}
			}
		}
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
				
	}
	
	
}, 'tree');










