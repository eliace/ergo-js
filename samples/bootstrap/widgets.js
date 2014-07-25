



//---------------------------------------------------------------
//
// ERGO BOOTSTRAP
//
//---------------------------------------------------------------





Ergo.defineClass('Bootstrap.widgets.List', 'Ergo.widgets.List', {
	
	defaults: {
		defaultItem: {
			etype: 'bootstrap:list-item'
		}
	}
	
}, 'bootstrap:list');



Ergo.defineClass('Bootstrap.widgets.ListItem', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<li/>',
		components: {
			content: {
				etype: 'link'
			}
		}
	},

	setText: function(v) { this.content.opt('text', v); }
	
}, 'bootstrap:list-item');





Ergo.defineClass('Bootstrap.widgets.ButtonToolbar', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'btn-toolbar'
	}
	
}, 'bootstrap:button-toolbar');



Ergo.defineClass('Bootstrap.widgets.ButtonGroup', 'Ergo.widgets.Box', {
	
	defaults: {
		state: 'horizontal',
		defaultItem: {
			etype: 'bootstrap:button'
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
	
}, 'bootstrap:button-group');



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
				etype: 'bootstrap:input-addon'
			},
			input: {
				etype: 'html:input',
				cls: 'form-control'
			}
		}
	},
	
	setPlaceholder: function(v) {
		this.input.opt('placeholder', v);
	}
	
}, 'bootstrap:input-group');







Ergo.defineClass('Bootstrap.widgets.Glyphicon', 'Ergo.core.Widget', {
	
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
	
	
}, 'bootstrap:glyphicon');




Ergo.defineClass('Bootstrap.widgets.Button', 'Ergo.html.Button', {
	
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
			'link:role': 'btn-link',
			'block': 'btn-block'
		},
		// binding: function(v) {
			// this.opt('text', v);
		// }
	}		
	
}, 'bootstrap:button');


Ergo.defineClass('Bootstrap.widgets.SplitButton', 'Bootstrap.widgets.Button', {
	
	defaults: {
		components: {
			caret: {
				etype: 'html:span',
				cls: 'caret'
//				html: '<span/>'
			},
			split: {
				etype: 'html:span',
				cls: 'sr-only'
//				html: '<span/>'
			}
		}
	},
	
	setText: function(v) {
		this.layout.el.append('         '+v+'         ');
	},
	
	
}, 'bootstrap:split-button');



Ergo.defineClass('Bootstrap.widgets.AnchorButton', 'Ergo.widgets.Link', {
	
	defaults: {
		cls: 'btn',
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
	
}, 'bootstrap:anchor-button');



Ergo.defineClass('Bootstrap.widgets.InputButton', 'Ergo.html.Input', {
	
	defaults: {
		cls: 'btn',
		state: 'default',
		type: 'button',
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
		}
	},
	
	setText: function(v) {
		this.el.val(v);
	}
	
}, 'bootstrap:input-button');






Ergo.defineClass('Bootstrap.widgets.GlyphiconButton', 'Bootstrap.widgets.Button', {
	
	defaults: {
		components: {
			icon: {
				etype: 'bootstrap:glyphicon',
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
	
}, 'bootstrap:glyphicon-button');




Ergo.defineClass('Bootstrap.widgets.DropdownMenu', 'Ergo.widgets.List', {
	
	etype: 'bootstrap:dropdown-menu',
	
	defaults: {
		cls: 'dropdown-menu',
		defaultItem: {
			etype: 'bootstrap:list-item',
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
	
	etype: 'bootstrap:dropdown',
	
	defaults: {
//		cls: 'dropdown clearfix',
//		mixins: ['easy-popup'],
		components: {
			button: {
				etype: 'bootstrap:button',
				cls: 'dropdown-toggle',
				components: {
					caret: {
						etype: 'html:span',
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
				etype: 'bootstrap:dropdown-menu'
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
	
	etype: 'bootstrap:split-dropdown',
	
	defaults: {
		components: {
			button: {
				etype: 'bootstrap:button',
				onClick: function(e) {
					this.events.bubble('action');
					e.baseEvent.stopPropagation();
				}
			},
			button2: {
				etype: 'bootstrap:button',
				cls: 'dropdown-toggle',
				tag: 'button2',
				components: {
					content: {
						etype: 'html:span',
						cls: 'caret',
						
					},
					split: {
						etype: 'html:span',
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
				etype: 'bootstrap:dropdown-menu'
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
			etype: 'html:input'
		}
	}
	
}, 'bootstrap:input-addon');


Ergo.defineClass('Bootstrap.widgets.ButtonAddon', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<span/>',
		cls: 'input-group-btn',
		content: {
			etype: 'bootstrap:button'
		}
	},
	
	setText: function(v) {
		this.content.opt('text', v);
	}
	
}, 'bootstrap:button-addon');



Ergo.defineClass('Bootstrap.widgets.DropdownAddon', 'Bootstrap.widgets.Dropdown', {
	
	defaults: {
		states: {
			'segmented:dir': 'input-group-btn'
		},
		state: 'segmented'
	}
	
}, 'bootstrap:dropdown-addon');




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
			etype: 'bootstrap:nav-item',
			states: {
				'selected': 'active'
			}
		}
	}
	
}, 'bootstrap:nav');





Ergo.defineClass('Bootstrap.widgets.NavItem', 'Ergo.widgets.Box', {
	
	defaults: {
		components: {
			content: {
				etype: 'html:a'
			}
		},
		set: {
			'text': function(v) { this.content.opt('text', v); }
		},
		binding: function(v) { this.opt('text', v); }
	}
	
}, 'bootstrap:nav-item');



Ergo.defineClass('Bootstrap.widgets.DropdownNavItem', 'Bootstrap.widgets.Dropdown', {
	
	defaults: {
		states: {
			'dropdown:dir': 'dropdown'
		},
		state: 'dropdown',
		components: {
			button: {
				etype: 'html:a',
				cls: 'dropdown-toggle'
			}
		}
	}
	
}, 'bootstrap:dropdown-nav-item');




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
						etype: 'bootstrap:button',
						cls: 'navbar-toggle'
					},
					brand: {
						etype: 'link',
//						href: '#',
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
	
}, 'bootstrap:navbar');




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
	
}, 'bootstrap:navbar-form');


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
	
}, 'bootstrap:form-group');





Ergo.defineClass('Bootstrap.widgets.Breadcrumb', 'Bootstrap.widgets.List', {
	
	defaults: {
		html: '<ol/>',
		cls: 'breadcrumb',
		itemFactory: function(o) {
			if($.isString(o)) o = this.options.shortcuts[o] || {text: o};
			else if($.isArray(o)) o = {items: o};
			
			if(o.last)
				Ergo.smart_override(o, {etype: 'html:li', state: 'active'});
							
			return $.ergo( Ergo.smart_override({}, this.options.defaultItem, o) );
		}
	}
	
}, 'bootstrap:breadcrumb');




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
				etype: 'bootstrap:list-item',
				text: '«'
			},
			nextButton: {
				weight: 1,
				etype: 'bootstrap:list-item',
				text: '»'				
			}
		}
	}
	
}, 'bootstrap:pagination');




Ergo.defineClass('Bootstrap.widgets.Pager', 'Bootstrap.widgets.List', {
	
	defaults: {
		cls: 'pager',
		components: {
			prevButton: {
				weight: -10,
				etype: 'bootstrap:list-item',
				text: 'Previous'
			},
			nextButton: {
				weight: 10,
				etype: 'bootstrap:list-item',
				text: 'Next'
			}
		}
	}
	
}, 'bootstrap:pager');




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
	
}, 'bootstrap:label');



Ergo.defineClass('Bootstrap.widgets.Badge', 'Ergo.widgets.Text', {
	
	defaults: {
		cls: 'badge'
	}
	
}, 'bootstrap:badge');



Ergo.defineClass('Bootstrap.widgets.Jumbotron', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'jumbotron'
	}
	
}, 'bootstrap:jumbotron');



Ergo.defineClass('Bootstrap.widgets.Thumbnail', 'Ergo.widgets.Link', {
	
	defaults: {
		cls: 'thumbnail',
		components: {
			content: {
				etype: 'html:img'
			}
		}
	},
	
	setImage: function(v) {
		this.content.opt('src', v);
	},
	
	setAlt: function(v) {
		this.content.opt('alt', v);
	}
	
}, 'bootstrap:thumbnail');




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
				etype: 'html:strong',
				autoRender: true,
//				html: '<strong/>'
			},
			closeButton: {
				etype: 'html:button',
				autoRender: 'ignore',
				cls: 'close',
				content: {
					etype: 'html:text',
					text: '×'
				}
			}
		}
	},
	
	setTitle: function(v) {
		this.title.opt('text', v);
	}
	
	
}, 'bootstrap:alert');




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
				etype: 'html:span',
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
	
	
}, 'bootstrap:progress');






Ergo.defineClass('Bootstrap.widgets.Media', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'media',
		components: {
			leftBox: {
				etype: 'html:a',
//				state: 'pull-left',
				pull: 'left',
				states: {
					'left:pull': 'pull-left',
					'right:pull': 'pull-right'
				},
				components: {
					content: {
						etype: 'html:img'
					}
				}
			},
			content: {
				cls: 'media-body',
				defaultItem: {
					etype: 'bootstrap:media'
				},
				components: {
					heading: {
						etype: 'html:h4',
//						html: '<h4/>',
						cls: 'media-heading'
					},
					content: {
						etype: 'html:text'
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
	
}, 'bootstrap:media');






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
	
}, 'bootstrap:list-group');






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
						etype: 'html:h3',
//						html: '<h3/>',
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
	
}, 'bootstrap:panel');






Ergo.defineClass('Bootstrap.widgets.TableRow', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<tr/>',
		states: {
			'active': 'active',
			'success:context': 'success',
			'warning:context': 'warning',
			'info:context': 'info',
			'danger:context': 'danger'
		},
		defaultItem: {
			html: '<td/>',
			states: {
				'active': 'active',
				'success:context': 'success',
				'warning:context': 'warning',
				'info:context': 'info',
				'danger:context': 'danger'
			},
			set: {
				'rowspan': function(v) { this.el.attr('rowspan', v); },
				'colspan': function(v) { this.el.attr('colspan', v); }
			}
		}
	}
	
}, 'bootstrap:table-row');



Ergo.defineClass('Bootstrap.widgets.Table', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table/>',
		cls: 'table',
		states: {
			'striped': 'table-striped',
			'bordered': 'table-bordered',
			'hovered': 'table-hover',
			'condensed': 'table-condensed'
		},
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









Ergo.defineClass('Bootstrap.layouts.Grid', 'Ergo.core.Layout', {
	
	defaults: {
//		name: 'grid',
		cls: 'row',
//		html: '<div class="row" />',
		pattern: {
			// md xs lg
		}
	},
	
	
	wrap: function (item) {
		
		if(item.options.noWrapper || this.options.wrapper === false) return item.el;
		
		return $('<div/>').append(item.el);
	},
	
	
	
	update: function() {
		
		var self = this;
		
		var o = this.options;
		
		
		var keys = {'mobile': 'xs', 'tablet': 'sm', 'desktop': 'md', 'xdesktop': 'lg'};
		
		this.container.children.each(function(item) {

			var el = item._wrapper || item.el;
			
			for(var i in o.pattern) {
				var tmpl = o.pattern[i];
				
				var k = -1;
				var d = 0;
				for(var j = 0; j < tmpl.length; j++) {
					if( tmpl[j] > 0 ) {
						k++;
					}
					else if( tmpl[j] < 0 ) {
						d -= tmpl[j];
					}
					else {
						d++;
					}
					
					if( k == item._index ) {
						el.addClass('col-'+(keys[i] || i)+'-'+tmpl[j]);
						if(d)
							el.addClass('col-'+(keys[i] || i)+'-offset-'+d);
						break;
					}
					
					if( tmpl[j] > 0 ) d = 0;
					
				}
				
			}
			
		});
		
		
		this.$super();
	}
	

/*	
	add: function(item, index, weight) {
		this.$super(item, index, weight);
		
		var o = this.options;
		
		var el = item._wrapper || item.el;
		
		var keys = {'mobile': 'xs', 'tablet': 'sm', 'desktop': 'md', 'xdesktop': 'lg'};
		
		for(var i in o.pattern) {
			var tmpl = o.pattern[i];
			
			var k = -1;
			var d = 0;
			for(var j = 0; j < tmpl.length; j++) {
				if( tmpl[j] > 0 ) {
					k++;
				}
				else {
					d++;
				}
				
				if( k == item._index ) {
					el.addClass('col-'+(keys[i] || i)+'-'+tmpl[j]);
					if(d)
						el.addClass('col-'+(keys[i] || i)+'-offset-'+d);
					break;
				}
				
				if( tmpl[j] > 0 ) d = 0;
				
			}
			
			// if( tmpl[item._index] ) {
				// item.el.addClass('col-'+(keys[i] || i)+'-'+tmpl[item._index]);
			// }
		}
		
	}
*/	
	
	
	
}, 'layout:grid');






Ergo.defineClass('Bootstrap.widgets.Form', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<form/>',
		layout: {
			etype: 'layout:default',
			wrapper: function(item) {
				
				var label = item.component('label');
				
				if( label ) {
//					item.el.addClass('form-group');
					var group = $('<div class="form-group"/>');
					group.append( label.el );
					return group.append(item.el);
				}
				
				return item.el;
			}
		}
	}
	
}, 'bootstrap:form');


Ergo.defineClass('Bootstrap.widgets.IForm', 'Bootstrap.widgets.Form', {
	
	defaults: {
//		html: '<form/>',
		cls: 'form-inline'
	}
	
}, 'bootstrap:inline-form');



Ergo.defineClass('Bootstrap.widgets.HForm', 'Bootstrap.widgets.Form', {
	
	defaults: {
//		html: '<form/>',
		cls: 'form-horizontal',
		
		layout: {
			etype: 'layout:default',
//			itemCls: 'form-group',
			pattern: {
				tablet: [2, 10]
			},
/*			
			wrapper: function(item) {
				
				var label = item.component('label');
				
				if( label ) {
					item.el.addClass('form-group');
					// var group = $('<div class="form-group"/>');
					// group.append( label.el );
					// return group.append(item.el);
//					item.el.append($('<div/>'));
				}
				else { 
					var group = $('<div class="form-group"></div>');
//					group.append( label.el );
//					var wrap = $('<div/>').append(item.el);
					return group.append( item.el );
				}
				
				return item.el;
			}
*/
			
			
			wrapper: function(item) {
				
				if( item instanceof Bootstrap.forms.Input ) {

					var label = item.component('label');
					
					if( label )
						item.el.append( label.el );
					
					return item.el;
				}

				
				var pattern = this.options.pattern;
				
				var group = $('<div class="form-group"/>');

				var wrap = $('<div/>').append( item.el );
				
				wrap.addClass('col-sm-'+pattern['tablet'][1]);
				
				var label = item.component('label');
				
				if( label ) {
					group.append( label.el );
					
					// for(var i in pattern) {
// 						
					// } 
					label.el.addClass('col-sm-'+pattern['tablet'][0]);
				}
				else {

					wrap.addClass('col-sm-offset-'+pattern['tablet'][0]);
				}
				
				
				// if(item.etype != 'bootstrap:form-input') {
					// return $('<div class="form-group" />').append(item.el);
				// }
				// return item.el;
				return group.append(wrap);
			}
		
		},
		
		defaultItem: {
			// layout: {
				// etype: 'layout:grid',
				// '-cls': 'row',
				// pattern: {
					// tablet: [2, 10]
				// },
				// wrapper: function(item) {
					// if(item._key == 'label') return item.el;
					// var wrap = $('div', this.el);
					// if(wrap.length == 0)
						// wrap = $('<div/>');
					// wrap.append(item.el);
					// return wrap;					
				// }
			// }
			
/*			
			layout: {
				etype: 'layout:default',
				pattern: {
					tablet: [2, 10]
				},
				wrapper: function(item) {
					if(item._key == 'label') return item.el;
					
					if(!this.container._wrapper) {
						
					}
					
					var group = this.container._wrapper || this.el;
					console.log(group);
					var wrap = $('div', group);
					if(wrap.length == 0)
						wrap = $('<div/>');
					wrap.append(item.el);
					return wrap;
				}
				// wrapper: function(item) {
// 					
					// var pattern = this.options.pattern;
// 					
// 					
// 					
// 					
					// return 
				// }
			}
*/			
			// layout: {
				// etype: 'layout:grid',
				// '-cls': 'row',
				// pattern: {
					// tablet: [2, 10]
				// },
				// wrapper: function(item) {
					// if(!item.options.noWrapper) {
						// var wrap = $('div', this.el);
						// if(wrap.length == 0)
							// wrap = $('<div/>');
						// wrap.append(item.el);
						// return wrap;
					// }
					// return item.el;
				// }
			// }
			
			
			// components: {
				// label: {
					// cls: 'control-label',
					// wrapper: false					
				// }
			// }
		},
	}
	
}, 'bootstrap:horizontal-form');












Ergo.defineClass('Bootstrap.forms.Input', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'form-group',
		components: {
			label: {
				weight: -100,
				etype: 'html:label'
			},
			content: {
				etype: 'html:input',
				cls: 'form-control'
			}
		},
		states: {
			'large:size': 'form-group-lg',
			'small:size': 'form-group-sm'
		}
	},
	
	setLabel: function(v) {
		this.label.opt('text', v);
	},
	
	setPlaceholder: function(v) {
		this.content.opt('placeholder', v);
	},
	
	setType: function(v) {
		this.content.opt('type', v);
	},
	
	setReadOnly: function(v) {
		this.content.opt('readOnly', v);
	}
	
	
}, 'bootstrap:form-input');




Ergo.defineClass('Bootstrap.forms.File', 'Bootstrap.forms.Input', {
	
	defaults: {
		type: 'file',
		components: {
			content: {
				'-cls': 'form-control'
			}
		}
	}
	
	
}, 'bootstrap:form-file');






Ergo.defineClass('Bootstrap.forms.Select', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'form-group',
		components: {
			label: {
				weight: -100,
				etype: 'html:label'
			},
			content: {
				etype: 'html:select',
				cls: 'form-control',
				// defaultItem: {
					// etype: 'html:option'
				// }
			}
		}
	},
	
	setLabel: function(v) {
		this.label.opt('text', v);
	}
	

	
	
}, 'bootstrap:form-select');






Ergo.defineClass('Bootstrap.forms.Checkbox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'checkbox',
		components: {
			content: {
				etype: 'html:label',
				content: {
					etype: 'html:input',
					autoRender: true,
					type: 'checkbox'
				}
//				trail: ' Check me out         '
			}
		},
		states: {
			'disabled': function(on) {
				this.content.content.opt('disabled', on);
			},
			'inline': 'checkbox-inline'
		}
	},
	
	setLabel: function(v) {
		this.content.opt('trail', v);
	},
	
	setText: function(v) {
		this.content.opt('trail', v);
	}
	
	
}, 'bootstrap:form-checkbox');




Ergo.defineClass('Bootstrap.forms.Radio', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'radio',
		components: {
			content: {
				etype: 'html:label',
				content: {
					etype: 'html:input',
					autoRender: true,
					type: 'radio'
				}
//				trail: ' Check me out         '
			}
		},
		states: {
			'disabled': function(on) {
				this.content.content.opt('disabled', on);
			}
		}
	},
	
	setLabel: function(v) {
		this.content.opt('trail', v);
	},
	
	setName: function(v) {
		this.content.content.opt('name', v);
	}
	
	
}, 'bootstrap:form-radio');






Ergo.defineMixin('Bootstrap.mixins.ControlLabel', {
	
	options: {
		components: {
			label: {
				weight: -100,
				etype: 'html:label',
				cls: 'control-label',
				autoRender: 'no'
//				noWrapper: true
			}
		}
	},
	
	
	setLabel: function(v) {
		this.label.opt('text', v);
	}
	
}, 'mixins:control-label');



Ergo.defineMixin('Bootstrap.mixins.ControlFeedback', {
	
	options: {
		components: {
			feedback: {
				weight: 100,
				etype: 'bootstrap:glyphicon',
				cls: 'form-control-feedback',
//				wrapper: false
			}
		},
		wrapper: {
			cls: 'has-feedback'
		}
//		hasFeedback: true
//		'+cls': 'has-feedback'
	},
	
	
	setIcon: function(v) {
		this.feedback.opt('value', v);
	}
	
	// $afterBuild: function(o) {
		// this.$super(o);
// 		
		// var group = this.el.parent('.form-group');
		// if(group.length > 0)
		 // group.addClass('has-feedback');
	// }
	
	
	
}, 'mixins:control-feedback');



Ergo.defineMixin('Bootstrap.mixins.HelpBlock', {
	
	options: {
		components: {
			help: {
				weight: 200,
				etype: 'html:span',
				cls: 'help-block'
			}
		}
	},
	
	
	setHelp: function(v) {
		this.help.opt('text', v);
	}
	
}, 'mixins:control-help');





Ergo.$bootstrap = Ergo.object;

// Ergo.$bootstrap = function(o, etype) {
	// return Ergo.object(o, 'bootstrap:'+etype);
// };

$.bootstrap = Ergo.$bootstrap;



