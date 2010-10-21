


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
//			this.states.set('has-subtree');
		}

//		if('submenuWidth' in o){
//			o.components.submenu.width = o.submenuWidth;
//		}
		
		if('defaultSubItem' in o){
			Dino.utils.overrideOpts(o.components.subtree.defaultItem, o.defaultSubItem, {'defaultSubItem': o.defaultSubItem});
		}
		
	},
	
	collapse: function() {
//		this.states.set('collapsed');
	},
	
	expand: function() {
//		this.states.clear('collapsed');
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
			e.translateStateTo(this.subtree);
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
		components: {
			subtree: {
				defaultItem: {
					dtype: 'text-tree-item'
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
		
	}
	
	
}, 'tree');



