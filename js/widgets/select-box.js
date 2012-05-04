

Ergo.declare('Ergo.widgets.SelectBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
		tabIndex: 0,
		cls: 'e-select-field',
		
		mixins: ['selectable'],


		components: {
			select: {
				cls: 'e-current-select'
			}			
		},
		
		defaultItem: {
			cls: 'e-select-arrow',
			components: {
				icon: {
					etype: 'box'
				}
			}
		},
		
		buttons: [],
		
		binding: function(v) {
			this.opt('text', v);
		},
		
		set: {
			'text': function(v) {
				this.select.opt('text', v);
			}
		}
	},
	
	
	$init: function(o) {
//		o.fieldContent.items = o.buttons;
		this.$super(o);

		o.items = o.buttons;
	}
	
}, 'select-box');
