


Ergo.defineClass('Bootstrap.widgets.List', 'Ergo.widgets.List', {
	
	defaults: {
		defaultItem: {
			etype: 'bs-list-item'
		}
	}
	
}, 'bs-list');



Ergo.defineClass('Bootstrap.widgets.ListItem', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<li/>',
		components: {
			content: {
				etype: 'anchor'
			}
		}
	},

	setText: function(v) { this.content.opt('text', v); }
	
}, 'bs-list-item');





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
		this.input.opt('placeholder', v);
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
		// binding: function(v) {
			// this.opt('text', v);
		// }
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
		// binding: function(v) {
			// this.opt('text', v);
		// },
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
			etype: 'bs-list-item',
//			content: {
//				etype: 'anchor',
//				tabIndex: -1,
				// onClick: function(e) {
					// e.baseEvent.preventDefault();
				// }
//			},
//			binding: function(v) { this.content.opt('text', v); },
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




Ergo.defineClass('Bootstrap.widgets.NavBar', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<nav/>',
		layout: {
			etype: 'layout:default',
			html: '<div class="container-fluid"/>'
		},
		cls: 'navbar navbar-default',
		states: {
			'fixed-top:align': 'navbar-fixed-top',
			'fixed-bottom:align': 'navbar-fixed-bottom',
			'static-top:align': 'navbar-static-top',
			'inverted': 'navbar-inverse'
		},
		components: {
			header: {
				cls: 'navbar-header',
				components: {
					toggle: {
						etype: 'bs-button',
						cls: 'navbar-toggle'
					},
					brand: {
						etype: 'anchor',
						href: '#',
						cls: 'navbar-brand'
					}
				}
			},
			content: {
				cls: 'collapse navbar-collapse',
				defaultItem: {
					states: {
						'left:align': 'navbar-left',
						'right:align': 'navbar-right'
					}					
				}
			}
		}
	},
	
	setBrand: function(v) {
		this.header.brand.opt('text', v);
	}
	
}, 'bs-navbar');




Ergo.defineClass('Bootstrap.widgets.NavbarForm', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'navbar-form',
		html: '<form/>'
		// layout: {
			// etype: 'layouts:default',
			// html: '<div class="form-group"/>'
		// },
		// defaultItem: {
			// cls: 'form-control'
		// }
	}
	
}, 'bs-navbar-form');


Ergo.defineClass('Bootstrap.widgets.FormGroup', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'form-group',
		defaultItem: {
			cls: 'form-control'
		},
		defaultComponent: {
			cls: 'form-control'
		}
		
	}
	
}, 'bs-form-group');





Ergo.defineClass('Bootstrap.widgets.Breadcrumb', 'Bootstrap.widgets.List', {
	
	defaults: {
		html: '<ol/>',
		cls: 'breadcrumb',
		itemFactory: function(o) {
			if($.isString(o)) o = this.options.shortcuts[o] || {text: o};
			else if($.isArray(o)) o = {items: o};
			
			if(o.last)
				Ergo.smart_override(o, {etype: 'box', html: '<li/>', state: 'active'});
							
			return Ergo.widget( Ergo.smart_override({}, this.options.defaultItem, o) );
		}
	}
	
}, 'bs-breadcrumb');




Ergo.defineClass('Bootstrap.widgets.Pagination', 'Bootstrap.widgets.List', {
	
	defaults: {
		cls: 'pagination',
		states: {
			'large:size': 'pagination-lg',
			'small:size': 'pagination-sm'
		},
		components: {
			prevButton: {
				weight: -1,
				etype: 'bs-list-item',
				text: '«'
			},
			nextButton: {
				weight: 1,
				etype: 'bs-list-item',
				text: '»'				
			}
		}
	}
	
}, 'bs-pagination');




Ergo.defineClass('Bootstrap.widgets.Pager', 'Bootstrap.widgets.List', {
	
	defaults: {
		cls: 'pager',
		components: {
			prevButton: {
				weight: -10,
				etype: 'bs-list-item',
				text: 'Previous'
			},
			nextButton: {
				weight: 10,
				etype: 'bs-list-item',
				text: 'Next'
			}
		}
	}
	
}, 'bs-pager');




Ergo.defineClass('Bootstrap.widgets.Label', 'Ergo.widgets.Text', {
	
	defaults: {
		cls: 'label',
		state: 'default',
		states: {
			'default:color': 'label-default',
			'primary:color': 'label-primary',
			'success:color': 'label-success',
			'info:color': 'label-info',
			'warning:color': 'label-warning',
			'danger:color': 'label-danger'
		}
	}
	
}, 'bs-label');



Ergo.defineClass('Bootstrap.widgets.Badge', 'Ergo.widgets.Text', {
	
	defaults: {
		cls: 'badge'
	}
	
}, 'bs-badge');



Ergo.defineClass('Bootstrap.widgets.Jumbotron', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'jumbotron'
	}
	
}, 'bs-jumbotron');



Ergo.defineClass('Bootstrap.widgets.Thumbnail', 'Ergo.widgets.Anchor', {
	
	defaults: {
		cls: 'thumbnail',
		components: {
			content: {
				etype: 'image'
			}
		}
	},
	
	setImage: function(v) {
		this.content.opt('src', v);
	},
	
	setAlt: function(v) {
		this.content.opt('alt', v);
	}
	
}, 'bs-thumbnail');




Ergo.defineClass('Bootstrap.widgets.Alert', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'alert',
		states: {
			'success:appearance': 'alert-success',
			'info:appearance': 'alert-info',
			'warning:appearance': 'alert-warning',
			'danger:appearance': 'alert-danger',
			'dismissible': function() {
				this.layout.add(this.closeButton);
				return 'alert-dismissible';
			}
		},
		components: {
			title: {
				etype: 'text',
				autoRender: true,
				html: '<strong/>'
			},
			closeButton: {
				etype: 'button',
				autoRender: 'ignore',
				cls: 'close',
				content: {
					etype: 'text',
					text: '×'
				}
			}
		}
	},
	
	setTitle: function(v) {
		this.title.opt('text', v);
	}
	
	
}, 'bs-alert');




Ergo.defineClass('Bootstrap.widgets.Progress', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'progress',
		defaultComponent: {
			cls: 'progress-bar',
			states:{
				'success:appearance': 'progress-bar-success',
				'info:appearance': 'progress-bar-info',
				'warning:appearance': 'progress-bar-warning',
				'danger:appearance': 'progress-bar-danger',
				'striped': 'progress-bar-striped'
			},
			binding: function(v) {
				this.el.css('width', v+'%');
	//			this.sr.opt('text', v+'% Complete');
				this.el.attr('aria-valuenow', v);
				
				if(this.options.labeled)
					this.opt('text', v+'%');				
			}
		},
		components: {
			bar: {
			},
			sr: {
				etype: 'text',
				cls: 'sr-only',
				autoRender: 'ignore'
			}
		},
		binding: function(v) {
			this.bar.opt('value', v)
		}
	},
	
	setAppearance: function(v) {
		this.bar.states.set(v);
	},
	
	setStriped: function(v) {
		this.bar.states.toggle('striped');
	},
	
	setAnimated: function(v) {
		this.bar.states.toggle('active');		
	},
	
	setLabeled: function(v) {
		this.bar.opt('labeled', v);
	}
	
	
}, 'bs-progress');






Ergo.defineClass('Bootstrap.widgets.Media', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'media',
		components: {
			leftBox: {
				etype: 'anchor',
//				state: 'pull-left',
				pull: 'left',
				states: {
					'left:pull': 'pull-left',
					'right:pull': 'pull-right'
				},
				components: {
					content: {
						etype: 'image'
					}
				}
			},
			content: {
				cls: 'media-body',
				defaultItem: {
					etype: 'bs-media'
				},
				components: {
					heading: {
						etype: 'box',
						html: '<h4/>',
						cls: 'media-heading'
					},
					content: {
						etype: 'text'
					}
				}
			}
		}
	},
	
	setImage: function(v) {
		this.leftBox.content.opt('src', v);
	},
	
	setTitle: function(v) {
		this.content.heading.opt('text', v);
	},
	
	setText: function(v) {
		this.content.content.opt('text', v);
	}
	
}, 'bs-media');






Ergo.defineClass('Bootstrap.widgets.ListGroup', 'Ergo.widgets.List', {
	
	defaults: {
		cls: 'list-group',
		defaultItem: {
			cls: 'list-group-item',
			states: {
				'success:appearance': 'list-group-item-success',
				'info:appearance': 'list-group-item-info',
				'warning:appearance': 'list-group-item-warning',
				'danger:appearance': 'list-group-item-danger'
			}
		}
	}
	
}, 'bs-list-group');






Ergo.defineClass('Bootstrap.widgets.Panel', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'panel',
		appearance: 'default',
		states: {
			'default:appearance': 'panel-default',
			'primary:appearance': 'panel-primary',
			'success:appearance': 'panel-success',
			'info:appearance': 'panel-info',
			'warning:appearance': 'panel-warning',
			'danger:appearance': 'panel-danger'
		},		
		components: {
			heading: {
				cls: 'panel-heading',
				components: {
					title: {
						html: '<h3/>',
						cls: 'panel-title'
					}
				}
			},
			body: {
				cls: 'panel-body'
			},
			footer: {
				cls: 'panel-footer',
				autoRender: 'no'
			}
		}
	},
	
	setTitle: function(v) {
		this.heading.title.opt('text', v);
	}
	
}, 'bs-panel');






Ergo.defineClass('Bootstrap.widgets.TableRow', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<tr/>',
		defaultItem: {
			html: '<td/>'
		}
	}
	
}, 'bootstrap:table-row');



Ergo.defineClass('Bootstrap.widgets.Table', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table/>',
		cls: 'table',
		components: {
			head: {
				html: '<thead/>',
				defaultItem: {
					etype: 'bootstrap:table-row',
					defaultItem: {
						html: '<th/>'
					}
				}
			},
			body: {
				html: '<tbody/>',
				defaultItem: {
					etype: 'bootstrap:table-row'
				}
			}
		}
	},
	
	
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		if('columns' in o) {
			
			var hcols = [];
			Ergo.each(o.columns, function(c){
				hcols.push(c);
			});
			
			Ergo.smart_override(o.components.head, {items: [{items: hcols}]});
			
		}
		
		if('rows' in o) {

			Ergo.smart_override(o.components.body, {items: o.rows});
			
		}
		
	},
	
	
	
	
	$construct: function(o) {
		this.$super(o);
		
		var self = this;
		
		this._columns = new Bootstrap.table.Columns(this);
		
		if('columns' in o) {
			// Ergo.each(o.columns, function(c, i){
				// self._columns.add(o.columns);			
			// });
			
			
			
		}
		
	}
	
}, 'bootstrap:table');



// mixin?
Ergo.defineClass('Bootstrap.table.Columns', 'Ergo.core.Object', {
	
	initialize: function(w, o) {
		this.$super(null, o);
		
		this._widget = w;
	},
	
	
	add: function(o) {
		this.head.items.add();
	}
	
	
	
});




Ergo.defineClass('Bootstrap.widgets.EmbedResponsive', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'embed-responsive',
		states: {
			'16by9:aspect': 'embed-responsive-16by9',
			'4by3:aspect': 'embed-responsive-4by3'
		},
		defaultComponent: {
			cls: 'embed-responsive-item'
		}
	}
	
}, 'bootstrap:embed-responsive');



Ergo.defineClass('Bootstrap.widgets.Well', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'well',
		states: {
			'large:size': 'well-lg',
			'small:size': 'well-sm'
		}
	}
	
}, 'bootstrap:well');








Ergo.defineClass('Ergo.html.Box', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<div/>'
	}
	
}, 'html:box');


Ergo.defineClass('Ergo.html.Iframe', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<iframe/>'
	},
	
	setSrc: function(v) {
		this.el.attr('src', v);
	}
	
}, 'html:iframe');




Ergo.html = function(o, etype) {
	
	if(!Ergo.alias(o.etype)) {
		o.etype = 'html:box';
		o.html = '<'+etype+'/>';
	}
	
	return Ergo.object(o);
};


Ergo.bootstrap = Ergo.object;

$.bootstrap = Ergo.bootstrap;



