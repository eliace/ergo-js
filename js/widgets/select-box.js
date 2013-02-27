

Ergo.declare('Ergo.widgets.SelectBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
//		tabIndex: 0,
		cls: 'e-select-box',
		
		mixins: ['selectable'],


		components: {
			content: {
				cls: 'e-current-select',
				weight: 10
			}			
		},
		
		defaultItem: {
			cls: 'e-select-arrow'
			// components: {
				// icon: {
					// etype: 'box'
				// }
			// }
		},
		
		buttons: [],
		
		binding: function(v) {
			this.opt('text', v);
		},
		
		set: {
			'text': function(v) {
				this.content.opt('text', v);
			}
		}
	},
	
	
	$pre_construct: function(o) {
//		o.fieldContent.items = o.buttons;
		this.$super(o);

		o.items = o.buttons;
	}
	
}, 'select-box');
