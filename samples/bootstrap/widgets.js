

Ergo.defineClass('Bootstrap.widgets.ButtonToolbar', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'btn-toolbar'
	}
	
}, 'btn-toolbar');



Ergo.defineClass('Bootstrap.widgets.ButtonGroup', 'Ergo.widgets.Box', {
	
	defaults: {
		state: 'horizontal',
		defaultItem: {
			etype: 'bs-button'
		},
		states: {
			'large:size': 'btn-group-lg',
			'small:size': 'btn-group-sm',
			'tiny:size': 'btn-group-xs',
			'horizontal:dir': 'btn-group',
			'vertical:dir': 'btn-group-vertical',
			'justified': 'btn-group-justified'
		}
	}
	
}, 'btn-group');



Ergo.defineClass('Bootstrap.widgets.InputGroup', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'input-group',
		states: {
			'large:size': 'input-group-lg',
			'small:size': 'input-group-sm',
			'tiny:size': 'input-group-xs',
		},
		components: {
			addon: {
				weight: -1,
				etype: 'bs-input-addon'
			},
			input: {
				etype: 'input',
				cls: 'form-control'
			}
		}
	},
	
	setPlaceholder: function(v) {
		this.input.el.attr('placeholder', v);
	}
	
}, 'bs-input-group');







Ergo.defineClass('Bootstrap.widgets.Glyphicon', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'glyphicon',
		html: '<span/>',
		states: {
			':icons': ['glyphicon-']
		}
	},
	
	setValue: function(v) {
		this.states.set('glyphicon-'+v);
	}
	
	
}, 'glyphicon');




Ergo.defineClass('Bootstrap.widgets.Button', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'btn',
		state: 'default',
		states: {
			'large:size': 'btn-lg',
			'small:size': 'btn-sm',
			'tiny:size': 'btn-xs',
			'default:role': 'btn-default',
			'primary:role': 'btn-primary',
			'success:role': 'btn-success',
			'info:role': 'btn-info',
			'warning:role': 'btn-warning',
			'danger:role': 'btn-danger',
		},
		binding: function(v) {
			this.opt('text', v);
		}
	}		
	
}, 'bs-button');


Ergo.defineClass('Bootstrap.widgets.SplitButton', 'Bootstrap.widgets.Button', {
	
	defaults: {
		components: {
			caret: {
				etype: 'box',
				cls: 'caret',
				html: '<span/>'
			},
			split: {
				etype: 'box',
				cls: 'sr-only',
				html: '<span/>'
			}
		}
	},
	
	setText: function(v) {
		this.layout.el.append('         '+v+'         ');
	},
	
	
}, 'bs-split-button');



Ergo.defineClass('Bootstrap.widgets.AnchorButton', 'Ergo.widgets.Anchor', {
	
	defaults: {
		cls: 'btn btn-default',
		binding: function(v) {
			this.opt('text', v);
		},
		tabIndex: -1,
		// onClick: function(e) {
			// e.baseEvent.preventDefault();
		// }
	}		
	
}, 'bs-anchor-button');




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
				// onClick: function(e) {
					// e.baseEvent.preventDefault();
				// }
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
	



Ergo.defineClass('Bootstrap.widgets.Dropdown', 'Bootstrap.widgets.ButtonGroup', {
	
	etype: 'bs-dropdown',
	
	defaults: {
//		cls: 'dropdown clearfix',
//		mixins: ['easy-popup'],
		components: {
			button: {
				etype: 'bs-button',
				cls: 'dropdown-toggle',
				components: {
					caret: {
						etype: 'text',
						cls: 'caret'
					}
				},
				onClick: function(e) {
					this.events.bubble('action');
					e.baseEvent.stopPropagation();
					e.baseEvent.preventDefault();
				}
			},
			dropdown: {
				etype: 'bs-dropdown-menu'
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
			self.states.unset('open');		
		});
	}
	
});





Ergo.defineClass('Bootstrap.widgets.SplitDropdown', 'Bootstrap.widgets.ButtonGroup', {
	
	etype: 'bs-split-dropdown',
	
	defaults: {
		components: {
			button: {
				etype: 'bs-button',
				onClick: function(e) {
					this.events.bubble('action');
					e.baseEvent.stopPropagation();
				}
			},
			button2: {
				etype: 'bs-button',
				cls: 'dropdown-toggle',
				tag: 'button2',
				components: {
					content: {
						etype: 'text',
						cls: 'caret',
						
					},
					split: {
						etype: 'text',
						cls: 'sr-only',
						text: 'Toggle Dropdown'
					}					
				},
				onClick: function(e) {
					this.events.bubble('action');
					e.baseEvent.stopPropagation();
				}

			},
			dropdown: {
				etype: 'bs-dropdown-menu'
			}
		},
		
		onAction: function(e) {
			if(e.target.tag == 'button2')
				this.open();
		}
		
	},
	
	setText: function(v) {
		this.button.opt('text', v);
	},

	setType: function(v) {
		this.button.states.set(v);
		this.button2.states.set(v);
	},
	
	
	open: function() {
		var self = this;
		this.states.set('open');
		$('html').one('click', function(){
			self.states.unset('open');		
		});
	}
	
});





Ergo.defineClass('Bootstrap.widgets.InputAddon', 'Ergo.widgets.Text', {
	
	defaults: {
		cls: 'input-group-addon',
		defaultComponent: {
			etype: 'input'
		}
	}
	
}, 'bs-input-addon');


Ergo.defineClass('Bootstrap.widgets.ButtonAddon', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<span/>',
		cls: 'input-group-btn',
		content: {
			etype: 'bs-button'
		}
	},
	
	setText: function(v) {
		this.content.opt('text', v);
	}
	
}, 'bs-button-addon');



Ergo.defineClass('Bootstrap.widgets.DropdownAddon', 'Bootstrap.widgets.Dropdown', {
	
	defaults: {
		states: {
			'segmented:dir': 'input-group-btn'
		},
		state: 'segmented'
	}
	
}, 'bs-dropdown-addon');




Ergo.defineClass('Bootstrap.widgets.Nav', 'Ergo.widgets.List', {
	
	defaults: {
		cls: 'nav',
		states: {
			'tabs:nav': 'nav-tabs',
			'pills:nav': 'nav-pills',
			'stacked': 'nav-stacked',
			'justified': 'nav-justified'
		},
		mixins: ['selectable'],
		defaultItem: {
			etype: 'bs-nav-item',
			states: {
				'selected': 'active'
			}
		}
	}
	
}, 'bs-nav');





Ergo.defineClass('Bootstrap.widgets.NavItem', 'Ergo.widgets.Box', {
	
	defaults: {
		components: {
			content: {
				etype: 'anchor'
			}
		},
		set: {
			'text': function(v) { this.content.opt('text', v); }
		},
		binding: function(v) { this.opt('text', v); }
	}
	
}, 'bs-nav-item');



Ergo.defineClass('Bootstrap.widgets.DropdownNavItem', 'Bootstrap.widgets.Dropdown', {
	
	defaults: {
		states: {
			'dropdown:dir': 'dropdown'
		},
		state: 'dropdown',
		components: {
			button: {
				etype: 'anchor',
				cls: 'dropdown-toggle'
			}
		}
	}
	
}, 'bs-dropdown-nav-item');









