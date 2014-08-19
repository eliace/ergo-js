
//= require <widgets/panel>


Ergo.declare('Ergo.widgets.GroupPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		html: '<fieldset/>',
		components: {
			header: {
				html: '<legend/>'
			}
		}
	}
	
	
}, 'group-panel');
