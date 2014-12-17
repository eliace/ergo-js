


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

