
//= require <widgets/natives/all>
//= require <extensions/focusable>


Ergo.declare('Ergo.widgets.Field', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-form-wrapper',
		extensions: ['focusable'],
		components: {
			label: {
				cls: 'e-form-label',
				content: {
					etype: 'label'
				}
			},
			content: {
				cls: 'e-form-holder'
			}
		},
		fieldContent: {},
		set: {
			'label': function(v) { this.label.opt('text', v); }
		}
	},
	
	
	$init: function(o) {
		this.$super(o);
		
		o.components.content.content = o.fieldContent;
	}
	
}, 'field');
