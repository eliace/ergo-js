

Ergo.defineClass('Bootstrap.widgets.ButtonToolbar', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'btn-toolbar'
	}
	
}, 'btn-toolbar');



Ergo.defineClass('Bootstrap.widgets.ButtonGroup', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'btn-group',
		defaultItem: {
			etype: 'bs-button'
		},
		states: {
			'large': 'btn-group-lg',
			'small': 'btn-group-sm',
			'tiny': 'btn-group-xs'
		},
		exclusives: ['large', 'small', 'tiny'],
	}
	
}, 'btn-group');



Ergo.defineClass('Bootstrap.widgets.Glyphicon', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'glyphicon',
		html: '<span/>',
		exclusives: ['glyphicon-']
	},
	
	setValue: function(v) {
		this.states.set('glyphicon-'+v);
	}
	
	
}, 'glyphicon');




Ergo.defineClass('Bootstrap.widgets.Button', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'btn btn-default',
		states: {
			'large': 'btn-lg',
			'small': 'btn-sm',
			'tiny': 'btn-xs'
		},
		exclusives: ['large', 'small', 'tiny'],
		binding: function(v) {
			this.opt('text', v);
		}
	}		
	
}, 'bs-button');




Ergo.defineClass('Bootstrap.widgets.GlyphiconButton', 'Bootstrap.widgets.Button', {
	
	defaults: {
		components: {
			icon: {
				etype: 'glyphicon',
				autoRender: true
			}
		}
	},
	
	
	setIcon: function(v) {
		this.icon.opt('value', v);
	},
	
	setText: function(v) {
		this.layout.el.append( v );
	}	
	
}, 'glyphicon-button');




Ergo.defineClass('Bootstrap.widgets.DropdownMenu', 'Ergo.widgets.List', {
	
	etype: 'bs-dropdown-menu',
	
	defaults: {
		cls: 'dropdown-menu',
		defaultItem: {
			content: {
				etype: 'anchor',
				tabIndex: -1,
				onClick: function(e) {
					e.baseEvent.preventDefault();
				}
			},
			binding: function(v) { this.content.opt('text', v); },
			states: {
				'header': 'dropdown-header'
			}
		},
		shortcuts: {
			'|': {
				cls: 'divider',
				'!content': undefined
			}
		},
		
		itemFactory: function(o, type) {
			if($.isString(o)) {
				if(o.match('^#.+')) o = {text: o.substr(1), cls: 'dropdown-header'};
			}
			return this.children.factory.call(this, o, type);	
		}
		
		
	}
	
});
	



Ergo.defineClass('Bootstrap.widgets.Dropdown', 'Ergo.widgets.Box', {
	
	etype: 'bs-dropdown',
	
	defaults: {
		cls: 'dropdown clearfix',
		components: {
			button: {
				etype: 'bs-button',
				cls: 'dropdown-toggle',
				content: {
					etype: 'text',
					cls: 'caret'
				},
				onClick: function(e) {
					this.events.bubble('action');
					e.baseEvent.stopPropagation();
				}
			},
			dropdown: {
				etype: 'bs-dropdown-menu',
//				items: ['Action', 'Another action', 'Something else here', '|', 'Separated link']
			}
		},
		
		onAction: function(e) {
			this.open();
		}
		
	},
	
	setText: function(v) {
		this.button.opt('text', '         '+v+'         ');
	},
	
	
	open: function() {
		var self = this;
		this.states.set('open');
		$('html').one('click', function(){
			self.close();
		});
	},
	
	close: function() {
		this.states.unset('open');		
	}
	
});







