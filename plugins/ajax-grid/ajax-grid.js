


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
		
		items: [{
			icon: 'icon-backward', 
			tag: 'first',
			onClick: function() {
				this.events.bubble('pageChange');
			}
		}, {
			icon: 'icon-caret-left',
			tag: 'previous',
			onClick: function() {
				this.events.bubble('pageChange');
			}
		}, {
			etype: 'text', 
			text: 'Страница'
		}, {
			etype: 'text-input',
			tag: 'current',
			events: {
				'change': function(e, w) {
					w.events.bubble('pageChange');
				}
			}
			// onDataChanged: function() {
				// this.parent.events.bubble('pageChange');				
			// }
		}, {
			icon: 'icon-caret-right',
			tag: 'next',
			onClick: function() {
				this.events.bubble('pageChange');
			}
		}, {
			icon: 'icon-forward',
			tag: 'last',
			onClick: function() {
				this.events.bubble('pageChange');
			}
		}]
		
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
				content: {
					items: [{
						etype: 'icon-button',
						icon: 'icon-refresh'
					}, {
						cls: 'e-splitter'
					}, {
						etype: 'grid-paginator',
					}]
				},
				hidden: false						
			}
			
		},
		
		onPageChange: function(e) {
			
			console.log(e.target.tag);
			
			
			e.stop();
		}
		
	}
	
	
}, 'ajax-grid-panel');

