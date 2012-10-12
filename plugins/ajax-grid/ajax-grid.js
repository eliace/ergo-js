


Ergo.declare('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'e-icon-button',
		
		components: {
			icon: {
				etype: 'icon'
			}
		},
		
		
		set: {
			'text': function(v) {
				this.icon.opt('text', v);
			},
			'icon': function(v) {
				this.icon.states.only(v);
			}
		}
		
	}
	
}, 'icon-button');





Ergo.declare('Ergo.widgets.ToolboxHeader', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-toolbox-header',
		
		components: {
			title: {
				cls: 'title',
			},
			toolbox: {
				cls: 'toolbox',
				layout: 'hbox',
				defaultItem: {
					etype: 'button-item'
				}
			}			
		}
		
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		if(o.tools) {
			Ergo.smart_override(o.components.toolbox, {items: o.tools});
		}
	}
	
	
	
}, 'toolbox-header');





Ergo.declare('Ergo.widgets.GridPaginator', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-grid-paginator',
		
		defaultItem: {
			etype: 'icon-button'
		},
		
		items: ['<<', '<', {etype: 'text', text: 'Страница'}, {etype: 'text-input'}, '>', '>>']
		
	}
	
	
	
}, 'grid-paginator');




Ergo.declare('Ergo.plugins.AjaxGridPaginator', 'Ergo.widgets.GridPaginator', {
	
	defaults: {
		
	}
	
	
	
}, 'ajax-grid-paginator');






Ergo.declare('Ergo.plugns.AjaxGridPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		
		components: {
			
			header: {
				etype: 'toolbox-header',
				autoBind: false
			},
			
			content: {
				etype: 'table-grid',
				
				content: {
					autoHeight: true						
				}
			},
			
			footer: {
				etype: 'ajax-grid-paginator',
				autoBind: false,
				hidden: false
			}
			
		}
		
	}
	
	
}, 'ajax-grid-panel');

